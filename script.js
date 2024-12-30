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

// Update the year in the footer
document.getElementById("current-year").textContent = new Date().getFullYear();

document
	.getElementById("email-icon")
	.addEventListener("click", function (event) {
		event.preventDefault(); // Prevent the default mailto behavior

		const email = "muhammeds.suhail@gmail.com";

		// Copy email to clipboard
		navigator.clipboard.writeText(email).then(function () {
			const popup = document.getElementById("copy-popup");
			popup.classList.add("show");

			setTimeout(function () {
				popup.classList.remove("show");
			}, 2000);
		});
	});
