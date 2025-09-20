/**
 * Mobile Menu Functionality
 * Handles mobile navigation menu interactions
 */

let isInitialized = false;

export function initMobileMenu() {
  // Prevent multiple initializations
  if (isInitialized) return;
  isInitialized = true;

  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuBtn = document.getElementById("close-mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
    });
  }

  // Close menu when clicking on the overlay (but not on menu items)
  if (mobileMenu) {
    mobileMenu.addEventListener("click", function (event) {
      if (event.target === mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    });
  }

  // Close menu when clicking on navigation links
  if (mobileMenu) {
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Add small delay to prevent flicker during navigation
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 150);
      });
    });
  }
}
