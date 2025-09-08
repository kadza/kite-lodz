/**
 * Fullscreen Modal Functionality
 * Handles image gallery fullscreen modal interactions
 */

export function initFullscreenModal() {
  const fullscreenModal = document.getElementById("fullscreen-modal");
  const fullscreenImage = document.getElementById("fullscreen-image");
  const closeFullscreenModalBtn = document.getElementById("close-fullscreen-modal");

  if (!fullscreenModal || !fullscreenImage) {
    return; // Exit if modal elements don't exist
  }

  // Get all images that should be clickable for fullscreen
  const images = document.querySelectorAll("img[src^='/assets/']");
  const links = document.querySelectorAll(".gallery a, .lightbox-item a");

  images.forEach((image) => {
    image.style.cursor = "pointer";
    image.addEventListener("click", function () {
      try {
        fullscreenImage.src = this.src;
        fullscreenModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      } catch (error) {
        console.error("Error opening fullscreen modal:", error);
      }
    });
  });

  // Handle gallery links for fullscreen
  links.forEach((link) => {
    link.style.cursor = "pointer";
    link.addEventListener("click", function (event) {
      try {
        event.preventDefault();
        fullscreenImage.src = this.href;
        fullscreenModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      } catch (error) {
        console.error("Error opening fullscreen modal from link:", error);
      }
    });
  });

  if (closeFullscreenModalBtn) {
    closeFullscreenModalBtn.addEventListener("click", function () {
      try {
        fullscreenModal.classList.add("hidden");
        document.body.style.overflow = "";
      } catch (error) {
        console.error("Error closing fullscreen modal:", error);
      }
    });
  }

  if (fullscreenModal) {
    fullscreenModal.addEventListener("click", function (event) {
      if (event.target === fullscreenModal) {
        try {
          fullscreenModal.classList.add("hidden");
          document.body.style.overflow = "";
        } catch (error) {
          console.error("Error closing fullscreen modal:", error);
        }
      }
    });
  }

  // Handle escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !fullscreenModal.classList.contains("hidden")) {
      try {
        fullscreenModal.classList.add("hidden");
        document.body.style.overflow = "";
      } catch (error) {
        console.error("Error closing fullscreen modal with escape:", error);
      }
    }
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFullscreenModal);
} else {
  initFullscreenModal();
}