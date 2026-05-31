// Show default section (About) on load
document.addEventListener("DOMContentLoaded", () => {
	showSection("about", document.querySelector(".tab.active"));
	
	// Remove initial-load class after animation completes
	setTimeout(() => {
		document.getElementById("nameText").classList.remove("initial-load");
	}, 700); // 200ms delay + 500ms animation
});

function animateFooter() {
	const footer = document.querySelector(".footer");
	if (!footer) return;

	footer.style.opacity = "0";
	footer.style.animation = "none";
	void footer.offsetWidth; // Force reflow so the same animation can restart
	footer.style.animation = "fadeIn 0.5s ease forwards";
	footer.style.animationDelay = "0.4s";
}

function renderSection(sectionId, tabElement) {
	// Hide all sections first so only one tab panel is visible.
	document.querySelectorAll(".content").forEach((section) => {
		section.style.display = "none";
	});

	const selectedSection = document.getElementById(sectionId);
	if (selectedSection) {
		selectedSection.style.display = "block";
	}

	document.querySelectorAll(".tab").forEach((tab) => {
		tab.classList.remove("active");
	});

	if (tabElement) {
		tabElement.classList.add("active");
	}

	configureFooterMessage();
	animateFooter();
}

function scrollToTopFast(onComplete) {
	const startY = window.scrollY;

	if (startY <= 0) {
		onComplete();
		return;
	}

	const duration = 180;
	const startTime = performance.now();

	const step = (currentTime) => {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const easedProgress = 1 - Math.pow(1 - progress, 3);

		window.scrollTo(0, startY * (1 - easedProgress));

		if (progress < 1) {
			requestAnimationFrame(step);
			return;
		}

		onComplete();
	};

	requestAnimationFrame(step);
}

function configureFooterMessage() {
	const defaultFooter = document.getElementById("footer-default");
	const hoverTipFooter = document.getElementById("footer-hover-tip");
	const usesPointerCursor = window.matchMedia("(pointer: fine)").matches;
	const showHoverTip = usesPointerCursor && Math.random() < 0.25; // 25% chance to show the hover tip

	if (!defaultFooter || !hoverTipFooter) {
		return;
	}

	defaultFooter.hidden = showHoverTip;
	hoverTipFooter.hidden = !showHoverTip;
}

let tabSwitchRequestId = 0;

// Show the selected section and highlight the active tab
function showSection(sectionId, tabElement) {
	const selectedSection = document.getElementById(sectionId);
	const isSelectedSectionVisible = selectedSection?.style.display === "block";

	if (tabElement?.classList.contains("active") && isSelectedSectionVisible) {
		return;
	}

	tabSwitchRequestId += 1;
	const requestId = tabSwitchRequestId;

	const completeTabSwitch = () => {
		if (requestId !== tabSwitchRequestId) {
			return;
		}

		renderSection(sectionId, tabElement);
	};

	if (window.scrollY <= 0) {
		completeTabSwitch();
		return;
	}

	scrollToTopFast(() => {
		if (requestId !== tabSwitchRequestId) {
			return;
		}

		completeTabSwitch();
	});
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
