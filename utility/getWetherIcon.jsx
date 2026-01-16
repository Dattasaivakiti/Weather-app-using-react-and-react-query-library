/**
 * Get weather icon path with base URL for GitHub Pages compatibility
 * @param {number} code - Weather code from API
 * @param {boolean} isDay - Whether it's day time
 * @returns {string} Full path to weather icon
 */
export function getWeatherIcon(code, isDay) {
  const baseUrl = import.meta.env.BASE_URL || "/";
  
  // Clear sky
  if (code === 0) {
    const icon = isDay ? "icon-sunny.webp" : "icon-partly-cloudy.webp";
    return `${baseUrl}weatherIcons/${icon}`;
  }

  if ([1, 2].includes(code)) {
    return `${baseUrl}weatherIcons/icon-partly-cloudy.webp`;
  }

  if (code === 3) {
    return `${baseUrl}weatherIcons/icon-overcast.webp`;
  }

  if ([45, 48].includes(code)) {
    return `${baseUrl}weatherIcons/icon-fog.webp`;
  }

  if ([51, 53, 55].includes(code)) {
    return `${baseUrl}weatherIcons/icon-drizzle.webp`;
  }

  if ([61, 63, 65, 80, 81, 82].includes(code)) {
    return `${baseUrl}weatherIcons/icon-rain.webp`;
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return `${baseUrl}weatherIcons/icon-snow.webp`;
  }

  if ([95, 96, 99].includes(code)) {
    return `${baseUrl}weatherIcons/icon-storm.webp`;
  }

  // Safe fallback (never sunny at night)
  const icon = isDay ? "icon-sunny.webp" : "icon-overcast.webp";
  return `${baseUrl}weatherIcons/${icon}`;
}
