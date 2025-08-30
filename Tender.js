// Sample data for demonstration
const governmentTenders = [
  { company: "Company A", profilePic: "one p", deadline: "2025-02-28", published: "2025-02-01", description: "Government tender description for Company A" },
  // Add more objects as needed
];

const privateTenders = [
  { company: "Company X", profilePic: "company_x.jpg", deadline: "2025-03-15", published: "2025-02-05", description: "Private tender description for Company X" },
  // Add more objects as needed
];

// Function to populate tender cards
function populateTenderCards(tenders, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content

  tenders.forEach(tender => {
    const card = document.createElement('div');
    card.classList.add('tender-card');
    card.innerHTML = `
      <img src="${tender.profilePic}" alt="${tender.company}">
      <h3>${tender.company}</h3>
      <p><strong>Deadline:</strong> ${tender.deadline}</p>
      <p><strong>Published:</strong> ${tender.published}</p>
      <p>${tender.description}</p>
      <a href="#" class="view-btn">View Tender</a>
    `;
    container.appendChild(card);
  });
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  populateTenderCards(governmentTenders, 'government-tenders');
  populateTenderCards(privateTenders, 'private-tenders');
});

// Add functionality for pagination if needed
// Example: Next and Previous buttons

