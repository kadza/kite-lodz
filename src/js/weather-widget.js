/**
 * Weather Widget Loader
 * Loads WindGuru weather widget for kite spots
 */

export function loadWeatherWidget() {
  if (window.weatherWidgetLoaded) {
    return;
  }

  const widgets = document.querySelectorAll('[id^="wg_fwdg_"]');
  if (widgets.length === 0) {
    return;
  }

  const loader = function () {
    widgets.forEach((widget) => {
      const uid = widget.id;
      const spotMatch = uid.match(/^wg_fwdg_(\d+)_/);
      if (!spotMatch) return;
      const spotId = spotMatch[1];

      const arg = [
        `s=${spotId}`,
        "m=100",
        `uid=${uid}`,
        "wj=knots",
        "tj=c",
        "waj=m",
        "tij=cm",
        "odh=0",
        "doh=24",
        "fhours=240",
        "hrsm=2",
        "vt=forecasts",
        "lng=en",
        "idbs=1",
        "p=WINDSPD,GUST,SMER,TMPE,FLHGT,CDC,APCP1s,RATING",
      ];

      const script = document.createElement("script");
      const tag = document.getElementsByTagName("script")[0];

      script.src = "https://www.windguru.cz/js/widget.php?" + arg.join("&");
      script.onerror = function () {
        console.warn("Failed to load weather widget for spot", spotId);
      };

      tag.parentNode.insertBefore(script, tag);
    });
  };

  // Load widget when page loads
  if (window.addEventListener) {
    window.addEventListener("load", loader, false);
  } else {
    window.attachEvent("onload", loader);
  }

  window.weatherWidgetLoaded = true;
}

// Auto-initialize for weather pages
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    // Only load on weather pages
    if (document.querySelector('[data-weather-widget]')) {
      loadWeatherWidget();
    }
  });
} else {
  if (document.querySelector('[data-weather-widget]')) {
    loadWeatherWidget();
  }
}