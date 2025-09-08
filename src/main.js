/**
 * Main JavaScript Entry Point
 * Imports and initializes all modules
 */

import { initMobileMenu } from './js/mobile-menu.js';
import { initFullscreenModal } from './js/fullscreen-modal.js';
import { loadWeatherWidget } from './js/weather-widget.js';
import { initWeatherData } from './js/weather-data.js';
import { initMap } from './js/map.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initialize core functionality
    initMobileMenu();

    // Initialize page-specific functionality
    initFullscreenModal();
    initMap();

    // Initialize weather functionality (only on weather pages)
    if (document.querySelector('[data-weather-widget]')) {
      loadWeatherWidget();
    }

    if (document.getElementById('wind-dir') || document.getElementById('meteo-forecast')) {
      initWeatherData();
    }

    // Log successful initialization
    console.log('JavaScript modules initialized successfully');

  } catch (error) {
    console.error('Error initializing JavaScript modules:', error);
  }
});

// Export for potential use by other scripts
export { initMobileMenu, initFullscreenModal, loadWeatherWidget, initWeatherData, initMap };