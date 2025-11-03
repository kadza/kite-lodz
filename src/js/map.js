/**
 * Map Functionality for Kite Spots
 * Handles Leaflet map initialization and interactions
 */

export function initMap() {
  // Check if map element exists
  const mapElement = document.getElementById("map");
  if (!mapElement) {
    return; // Exit if map element doesn't exist
  }

  try {
    const initialCenter = [51.82, 18.69];
    const initialZoom = 12;
    const map = L.map("map").setView(initialCenter, initialZoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    const defaultIcon = new L.Icon.Default();
    const greenIcon = new L.Icon({
      iconUrl: "/assets/marker-icon-green.webp",
      shadowUrl: "/assets/marker-shadow.webp",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const spots = {
      popow: {
        coords: [51.831492, 18.720963],
        elem: document.querySelector(`a[href="/spots/jeziorsko/popow"]`),
      },
      "popow-polanka": {
        coords: [51.828077, 18.718547],
        elem: document.querySelector(
          `a[href="/spots/jeziorsko/popow-polanka"]`,
        ),
      },
      wylazlow: {
        coords: [51.820756, 18.717871],
        elem: document.querySelector(`a[href="/spots/jeziorsko/wylazlow"]`),
      },
      skarpa: {
        coords: [51.837093, 18.719265],
        elem: document.querySelector(`a[href="/spots/jeziorsko/skarpa"]`),
      },
      "brodnia-tama": {
        coords: [51.794334, 18.700114],
        elem: document.querySelector(`a[href="/spots/jeziorsko/brodnia-tama"]`),
      },
      "brodnia-cypel": {
        coords: [51.796756, 18.684622],
        elem: document.querySelector(
          `a[href="/spots/jeziorsko/brodnia-cypel"]`,
        ),
      },
      ostrow: {
        coords: [51.803366, 18.660262],
        elem: document.querySelector(`a[href="/spots/jeziorsko/ostrow"]`),
      },
      zaspy: {
        coords: [51.822518, 18.668995],
        elem: document.querySelector(`a[href="/spots/jeziorsko/zaspy"]`),
      },
      milkowice: {
        coords: [51.831662, 18.673346],
        elem: document.querySelector(`a[href="/spots/jeziorsko/milkowice"]`),
      },
    };

    for (const spotName in spots) {
      const spot = spots[spotName];
      const popupContent = spot.elem
        ? `<a href="${spot.elem.href}" class="popup-link">${spot.elem.textContent}</a>`
        : spot.elem?.textContent || spotName;
      spot.marker = L.marker(spot.coords, { icon: defaultIcon })
        .addTo(map)
        .bindPopup(popupContent);

      spot.marker.on("click", function (e) {
        map.setView(e.latlng, 18);
      });

      spot.marker.on("mouseover", function () {
        this.setIcon(greenIcon);
        spot.elem?.classList.add("text-hoverColor");
      });

      spot.marker.on("mouseout", function () {
        this.setIcon(defaultIcon);
        spot.elem?.classList.remove("text-hoverColor");
      });

      spot.elem?.addEventListener("mouseover", function () {
        spot.marker.setIcon(greenIcon);
        spot.elem.classList.add("text-hoverColor");
      });

      spot.elem?.addEventListener("mouseout", function () {
        spot.marker.setIcon(defaultIcon);
        spot.elem.classList.remove("text-hoverColor");
      });
    }

    // Reset map button
    const resetBtn = document.getElementById("reset-map");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        map.setView(initialCenter, initialZoom);
        map.closePopup();
      });
    }
  } catch (error) {
    console.error("Error initializing map:", error);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMap);
} else {
  initMap();
}
