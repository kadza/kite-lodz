/**
 * Weather Data Fetching and Processing
 * Handles weather data from external APIs
 */

export function initWeatherData() {
  // Check if weather elements exist
  const windDirElement = document.getElementById("wind-dir");
  const windSpeedElement = document.getElementById("wind-speed");
  const temperatureElement = document.getElementById("temperature");
  const forecastElement = document.getElementById("meteo-forecast");

  if (!windDirElement || !windSpeedElement || !temperatureElement) {
    return; // Exit if weather elements don't exist
  }

  try {
    // Set up forecast image with fallback to older forecasts
    if (forecastElement) {
      loadForecastImage(forecastElement);
    }

    // Fetch and display current weather data
    fetchWeather();

  } catch (error) {
    console.error("Error initializing weather data:", error);
    if (windDirElement) windDirElement.textContent = "Błąd";
    if (windSpeedElement) windSpeedElement.textContent = "Błąd";
    if (temperatureElement) temperatureElement.textContent = "Błąd";
  }
}

function getFdateCandidates() {
  const options = {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  };
  const formatter = new Intl.DateTimeFormat("en-CA", options);
  const candidates = [];

  // Try progressively older forecasts: 6h, 12h, 18h, 24h back
  for (const hoursBack of [6, 12, 18, 24]) {
    const delayedDate = new Date(Date.now() - hoursBack * 3600000);
    const parts = formatter.formatToParts(delayedDate);

    const year = parts.find((p) => p.type === "year").value;
    const month = parts.find((p) => p.type === "month").value;
    const day = parts.find((p) => p.type === "day").value;
    const hour = parseInt(parts.find((p) => p.type === "hour").value, 10);

    const forecastHourSlot = Math.floor(hour / 6) * 6;
    const fdate = `${year}${month}${day}${String(forecastHourSlot).padStart(2, "0")}`;

    if (!candidates.includes(fdate)) {
      candidates.push(fdate);
    }
  }
  return candidates;
}

function isValidForecast(img) {
  // Black rectangle placeholder from meteo.pl is 10x130px
  // Valid forecasts are 540x780px
  return img.naturalWidth > 100 && img.naturalHeight > 100;
}

async function loadForecastImage(forecastElement) {
  const candidates = getFdateCandidates();

  for (const fdate of candidates) {
    const url = `https://old.meteo.pl/um/metco/mgram_pict.php?ntype=0u&fdate=${fdate}&row=416&col=206&lang=pl`;
    const valid = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(isValidForecast(img) ? url : null);
      img.onerror = () => resolve(null);
      img.src = url;
    });
    if (valid) {
      forecastElement.src = valid;
      return;
    }
  }

  // All candidates failed — show the most recent one anyway
  forecastElement.src = `https://old.meteo.pl/um/metco/mgram_pict.php?ntype=0u&fdate=${candidates[0]}&row=416&col=206&lang=pl`;
}

async function fetchWeather() {
  try {
    const response = await fetch(
      "https://meteor-proxy.lukasz-kujawiak.workers.dev/",
    );
    const text = await response.text();

    const windDirMatch = text.match(/windDir:\s*([\d.-]+)/);
    const windSpeedMatch = text.match(/windSpeed:\s*([\d.-]+)/);
    const temperatureIntMatch = text.match(/temperatureInt:\s*([\d.-]+)/);

    const windDir = windDirMatch ? parseFloat(windDirMatch[1]) : null;
    const windSpeedMps = windSpeedMatch ? parseFloat(windSpeedMatch[1]) : null;
    const temperatureInt = temperatureIntMatch
      ? parseFloat(temperatureIntMatch[1]).toFixed(2)
      : "Błąd";

    function toTextualDescription(degree) {
      if (degree > 337.5 || degree <= 22.5) return "N";
      if (degree > 22.5 && degree <= 67.5) return "NE";
      if (degree > 67.5 && degree <= 112.5) return "E";
      if (degree > 112.5 && degree <= 157.5) return "SE";
      if (degree > 157.5 && degree <= 202.5) return "S";
      if (degree > 202.5 && degree <= 247.5) return "SW";
      if (degree > 247.5 && degree <= 292.5) return "W";
      if (degree > 292.5 && degree <= 337.5) return "NW";
      return "Błąd";
    }

    const windSpeedKnots = windSpeedMps !== null
      ? (windSpeedMps * 1.94384).toFixed(2)
      : "Błąd";
    const windSpeedMpsFormatted = windSpeedMps !== null
      ? windSpeedMps.toFixed(2)
      : "Błąd";

    document.getElementById("wind-dir").textContent =
      windDir !== null ? toTextualDescription(windDir) : "Błąd";
    document.getElementById("wind-speed").textContent =
      `${windSpeedMpsFormatted} m/s (${windSpeedKnots} kt)`;
    document.getElementById("temperature").textContent =
      `${temperatureInt} °C`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("wind-dir").textContent = "Błąd";
    document.getElementById("wind-speed").textContent = "Błąd";
    document.getElementById("temperature").textContent = "Błąd";
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWeatherData);
} else {
  initWeatherData();
}