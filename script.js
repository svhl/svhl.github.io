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

const nameText = document.getElementById("nameText");

// Function to toggle text with fade effect on click when screen width is below 675px
nameText.addEventListener("click", function () {
	nameText.classList.add("fade-out"); // Add fade-out effect

	// Wait for the fade-out transition to finish before changing text
	setTimeout(function () {
		if (nameText.innerText === "Hi, I'm Suhail!") {
			nameText.innerText = "Hi, I'm svhl!"; // Change text on click
			nameText.classList.add("fira-code");
		} else {
			nameText.innerText = "Hi, I'm Suhail!"; // Revert text on another click
			nameText.classList.remove("fira-code");
		}

		nameText.classList.remove("fade-out"); // Remove fade-out effect
		nameText.classList.add("fade-in"); // Add fade-in effect
	}, 300); // Matches the duration of the opacity transition (0.3s)
});

window.onload = () => {
	// Apply delay when the page loads, specifically for the 'About' tab
	const aboutTab = document.querySelector(".tab1");
	if (aboutTab.classList.contains("active")) {
		setFooterDelay(aboutTab); // Set delay if 'About' tab is active on load
	}
};

document.querySelectorAll(".tab").forEach((tab, index) => {
	tab.addEventListener("click", () => {
		// Remove any existing animation (reset)
		const footer = document.querySelector(".footer");
		footer.style.animation = "none";

		// Force reflow to reset the animation
		void footer.offsetWidth;

		// Set the delay based on tab clicked
		setFooterDelay(tab);
	});
});

function setFooterDelay(tab) {
	const footer = document.querySelector(".footer");
	let delay;
	if (tab.classList.contains("tab1")) {
		delay = "0.5s"; // Delay for About tab
	} else if (tab.classList.contains("tab2")) {
		delay = "2s"; // Delay for Skills tab
	} else if (tab.classList.contains("tab3")) {
		delay = "3s"; // Delay for Projects tab
	}

	// Apply animation with calculated delay
	footer.style.animation = `fadeIn 0.5s ease forwards ${delay}`;
}
