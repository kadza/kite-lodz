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
    // Set up forecast image
    if (forecastElement) {
      const now = new Date();
      const delayedDate = new Date(now.getTime() - 21600000); // Subtract 6 hours

      const options = {
        timeZone: "Europe/Warsaw",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-CA", options);
      const parts = formatter.formatToParts(delayedDate);

      const year = parts.find((p) => p.type === "year").value;
      const month = parts.find((p) => p.type === "month").value;
      const day = parts.find((p) => p.type === "day").value;
      const hour = parseInt(parts.find((p) => p.type === "hour").value, 10);

      const forecastHourSlot = Math.floor(hour / 6) * 6;
      const formattedHour = String(forecastHourSlot).padStart(2, "0");

      const fdate = `${year}${month}${day}${formattedHour}`;
      const forecastUrl = `https://old.meteo.pl/um/metco/mgram_pict.php?ntype=0u&fdate=${fdate}&row=416&col=206&lang=pl`;

      forecastElement.src = forecastUrl;
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