const form = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const message = document.getElementById("message");
let editing = false;

// 🟢 Fetch and display all jobs
async function loadJobs() {
  try {
    const res = await fetch("/api/jobs");
    const jobs = await res.json();

    jobList.innerHTML = "";
    if (jobs.length === 0) {
      jobList.innerHTML = `<p class="text-gray-500 text-center">No jobs posted yet.</p>`;
      return;
    }

    jobs.forEach((job) => {
      const div = document.createElement("div");
      div.className = "border rounded-lg p-4 shadow-sm hover:shadow-md transition";

      div.innerHTML = `
        <h3 class="font-bold text-lg text-gray-800">${job.title}</h3>
        <p class="text-sm text-gray-600">${job.company} - ${job.location}</p>
        <p class="text-sm text-gray-500 mb-2">${job.salary || "N/A"}</p>
        <p class="text-gray-700 text-sm mb-3">${job.description}</p>

        <div class="flex justify-end gap-3">
          <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded" onclick="editJob('${job._id}')">Update</button>
          <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" onclick="deleteJob('${job._id}')">Delete</button>
        </div>
      `;

      jobList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

// 🟢 Submit (Insert / Update)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const jobTitle = document.getElementById("title");
  const jobCompany = document.getElementById("company");
  const jobLocation = document.getElementById("location");
  const jobSalary = document.getElementById("salary");
  const jobDescription = document.getElementById("description");

  const jobData = {
    title: jobTitle.value.trim(),
    company: jobCompany.value.trim(),
    location: jobLocation.value.trim(),
    salary: jobSalary.value.trim(),
    description: jobDescription.value.trim(),
  };

  if (!jobData.title || !jobData.company || !jobData.location || !jobData.description) {
    message.textContent = "⚠️ Please fill out all required fields.";
    message.className = "text-red-600 text-center font-semibold";
    return;
  }

  try {
    let response;
    if (editing) {
      const id = document.getElementById("jobId").value;
      response = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
    } else {
      response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
    }

    if (response.ok) {
      message.textContent = editing ? "✅ Job updated successfully!" : "✅ Job added successfully!";
      message.className = "text-green-600 text-center font-semibold";
      form.reset();
      editing = false;
      document.getElementById("jobId").value = "";
      await loadJobs();
    } else {
      message.textContent = "❌ Operation failed.";
      message.className = "text-red-600 text-center font-semibold";
    }
  } catch (err) {
    console.error(err);
  }
});


// 🟢 Delete Job
async function deleteJob(id) {
  if (!confirm("Are you sure you want to delete this job?")) return;

  try {
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (res.ok) {
      await loadJobs();
    }
  } catch (err) {
    console.error(err);
  }
}

// 🟢 Edit Job
async function editJob(id) {
  try {
    const res = await fetch(`/api/jobs/${id}`);
    const job = await res.json();

    document.getElementById("jobId").value = job._id;
    document.getElementById("title").value = job.title;
    document.getElementById("company").value = job.company;
    document.getElementById("location").value = job.location;
    document.getElementById("salary").value = job.salary || "";
    document.getElementById("description").value = job.description;
    editing = true;
    message.textContent = "✏️ Editing mode enabled.";
    message.className = "text-yellow-600 text-center font-semibold";
  } catch (err) {
    console.error(err);
  }
}

// Load jobs on page load
loadJobs();

// Expose for inline onclick
window.deleteJob = deleteJob;
window.editJob = editJob;
