// Dummy job data (you'll replace with backend later)
const jobs = [
  {
    title: "Frontend Developer",
    company: "Tech Innovators Inc.",
    location: "New York, USA",
    description:
      "We are looking for a Frontend Developer proficient in HTML, CSS, and JavaScript. Experience with React is a plus.",
  },
  {
    title: "Government Data Analyst",
    company: "Department of Statistics",
    location: "Washington, D.C.",
    description:
      "Seeking an experienced data analyst for government projects involving public policy and research.",
  },
  {
    title: "Private Bank Manager",
    company: "First Capital Bank",
    location: "Chicago, IL",
    description:
      "Oversee operations and customer relations in our Chicago branch. Prior banking management experience required.",
  },
];

// Function to load job cards
function loadJobs() {
  const container = document.getElementById("job-list");
  container.innerHTML = "";

  jobs.forEach((job, index) => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <button onclick="openModal(${index})">View Details</button>
    `;
    container.appendChild(card);
  });
}

// Function to open modal
function openModal(index) {
  const job = jobs[index];
  document.getElementById("modal-title").innerText = job.title;
  document.getElementById("modal-company").innerText = "Company: " + job.company;
  document.getElementById("modal-location").innerText = "Location: " + job.location;
  document.getElementById("modal-description").innerText = job.description;

  document.getElementById("job-modal").style.display = "flex";
}

// Close modal
document.querySelector(".close").onclick = function () {
  document.getElementById("job-modal").style.display = "none";
};

// Close when clicking outside
window.onclick = function (e) {
  const modal = document.getElementById("job-modal");
  if (e.target === modal) modal.style.display = "none";
};

// Search Function
document.getElementById("search").addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();
  const filtered = jobs.filter((job) =>
    job.title.toLowerCase().includes(value) ||
    job.company.toLowerCase().includes(value) ||
    job.location.toLowerCase().includes(value)
  );
  renderFilteredJobs(filtered);
});

function renderFilteredJobs(filteredJobs) {
  const container = document.getElementById("job-list");
  container.innerHTML = "";

  filteredJobs.forEach((job, index) => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <button onclick="openModal(${index})">View Details</button>
    `;
    container.appendChild(card);
  });
}

// Load jobs on page load
window.onload = loadJobs;
