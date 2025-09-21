/**
 * Collapsible Menu Functionality
 * Handles expand/collapse of menu sections
 */

let collapsibleState = {
  "spoty-section": false, // Default collapsed
};

export function initCollapsibleMenu() {
  // Prevent multiple initializations
  if (document.querySelector(".collapsible-menu-initialized")) return;
  document.body.classList.add("collapsible-menu-initialized");

  // Find all collapsible toggle buttons
  const toggleButtons = document.querySelectorAll("[data-toggle-menu]");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("data-toggle-menu");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const isExpanded = targetSection.classList.contains("expanded");

        if (isExpanded) {
          targetSection.classList.remove("expanded");
          this.setAttribute("aria-expanded", "false");
          collapsibleState[targetId] = false;
        } else {
          targetSection.classList.add("expanded");
          this.setAttribute("aria-expanded", "true");
          collapsibleState[targetId] = true;
        }

        // Rotate arrow
        const arrow = this.querySelector(".menu-arrow");
        if (arrow) {
          arrow.classList.toggle("rotated");
        }
      }
    });
  });
}

// Auto-initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCollapsibleMenu);
} else {
  initCollapsibleMenu();
}
