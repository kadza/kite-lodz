/**
 * Map Functionality for Przykona Spots
 * Handles Leaflet map initialization and interactions
 */

export function initMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement || mapElement.dataset.spot !== "przykona") {
    return;
  }

  try {
    const initialCenter = [52.004, 18.653];
    const initialZoom = 14;
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
      poludnie: {
        coords: [52.000246, 18.653343],
        elem: document.querySelector(`a[href="/spots/przykona/poludnie"]`),
      },
      polnoc: {
        coords: [52.007886, 18.652701],
        elem: document.querySelector(`a[href="/spots/przykona/polnoc"]`),
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

