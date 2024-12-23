// Show default section (About) on load
document.addEventListener("DOMContentLoaded", () => {
	showSection("about", document.querySelector(".tab.active"));
});

// Show the selected section and highlight the active tab
function showSection(sectionId, tabElement) {
	// Hide all sections
	document.querySelectorAll(".content-section").forEach((section) => {
		section.style.display = "none";
	});

	// Display selected section
	const selectedSection = document.getElementById(sectionId);
	selectedSection.style.display = "block";

	// Update active tab styling
	document.querySelectorAll(".tab").forEach((tab) => {
		tab.classList.remove("active");
	});
	tabElement.classList.add("active");
}
