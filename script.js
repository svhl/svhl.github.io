// Show default section (About) on load
document.addEventListener("DOMContentLoaded", () => {
	showSection("about", document.querySelector(".tab.active"));
});

// Show the selected section and highlight the active tab
function showSection(sectionId, tabElement) {
	// Hide all sections
	document.querySelectorAll(".content").forEach((section) => {
		section.style.display = "none";
	});

	// Display selected section
	const selectedSection = document.getElementById(sectionId);
	selectedSection.style.display = "block";

	document.querySelectorAll(".tab").forEach((tab) => {
		// Scroll to top when a tab is clicked
		tab.addEventListener("click", () => {
			window.scrollTo(0, 0);
		});
		// Update active tab styling
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

const nameText = document.getElementById("nameText");

let isTransitioning = false;
let isTransitioningCursor = false;

nameText.addEventListener("click", function () {
	if (isTransitioning) return;

	isTransitioning = true;
	nameText.classList.add("fade-out");
	clickHide.classList.add("fade-out");

	// Wait for the fade-out transition to finish before changing text
	setTimeout(function () {
		if (nameText.innerText === "Hi, I'm Suhail!") {
			nameText.innerText = "hi, i'm svhl!"; // Change text on click
			nameText.classList.add("fira-code");
		} else {
			nameText.innerText = "Hi, I'm Suhail!"; // Revert text on another click
			nameText.classList.remove("fira-code");
		}

		nameText.classList.remove("fade-out");
		nameText.classList.add("fade-in");
		isTransitioning = false;
	}, 300); // Matches the duration of the opacity transition (0.3s)
});

document.getElementById("nameText").addEventListener("click", function () {
	if (isTransitioningCursor) return;
	const clickElement = document.querySelector(".click");

	clickElement.style.opacity = "1";
	clickElement.style.animation = "none"; // Reset any previous animation
	void clickElement.offsetWidth; // Force reflow to restart animation
	clickElement.style.animation = "fadeOut 0.1s ease forwards";
	isTransitioningCursor = true;
});
