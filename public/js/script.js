document.addEventListener("DOMContentLoaded", async () => {
  const jobListContainer = document.getElementById("job-list");
  const searchInput = document.getElementById("search");
  const modal = document.getElementById("job-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalCompany = document.getElementById("modal-company");
  const modalLocation = document.getElementById("modal-location");
  const modalDescription = document.getElementById("modal-description");
  const closeBtn = document.querySelector(".close");

  let jobs = [];

  // ✅ Fetch jobs from API
  async function loadJobs() {
    try {
      const res = await fetch("/api/jobs");
      jobs = await res.json();

      if (!Array.isArray(jobs)) jobs = [];

      renderJobs(jobs);
    } catch (error) {
      console.error("❌ Failed to fetch jobs:", error);
      jobListContainer.innerHTML = `<p style="color:red;">Error loading jobs. Please try again later.</p>`;
    }
  }

  // ✅ Render all job cards
  function renderJobs(jobArray) {
    jobListContainer.innerHTML = "";

    if (jobArray.length === 0) {
      jobListContainer.innerHTML = "<p>No jobs found.</p>";
      return;
    }

    jobArray.forEach((job, index) => {
      const card = document.createElement("div");
      card.className = "job-card";
      card.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <button class="details-btn" data-index="${index}">View Details</button>
      `;
      jobListContainer.appendChild(card);
    });

    // Attach click listeners after rendering
    document.querySelectorAll(".details-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        openModal(index);
      });
    });
  }

  // ✅ Modal: open with selected job
  function openModal(index) {
    const job = jobs[index];
    modalTitle.innerText = job.title;
    modalCompany.innerText = "Company: " + job.company;
    modalLocation.innerText = "Location: " + job.location;
    modalDescription.innerText = job.description;

    modal.style.display = "flex";
  }

  // ✅ Close modal events
  closeBtn.onclick = () => (modal.style.display = "none");
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  // ✅ Search filter
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(value) ||
        job.company.toLowerCase().includes(value) ||
        job.location.toLowerCase().includes(value)
    );
    renderJobs(filtered);
  });

  // ✅ Initial load
  loadJobs();
});
  