import { useQuery } from "@tanstack/react-query";

/**
 * Fetches weather data for given coordinates using Open-Meteo API
 * @param {Object} coord - Object with lat and lon properties
 * @param {boolean} enabled - Whether the query should run
 * @returns {Object} Query result with weather data
 */
export function useWeather(coord, enabled = true) {
  return useQuery({
    queryKey: ["weather", coord.lat, coord.lon],
    queryFn: async () => {
      if (!coord.lat || !coord.lon) {
        throw new Error("Coordinates are required");
      }

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?` +
          `latitude=${coord.lat}&longitude=${coord.lon}` +
          `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
          `&hourly=temperature_2m,weather_code` +
          `&current=relative_humidity_2m,temperature_2m,wind_speed_10m,apparent_temperature,precipitation,is_day,weather_code`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      return data;
    },
    enabled: enabled && !!coord.lat && !!coord.lon,
    staleTime: 60 * 1000, // Data is fresh for 1 minute
    refetchInterval: 60 * 1000, // Auto-refetch every minute (replaces setInterval)
    refetchIntervalInBackground: true, // Continue refetching in background
    retry: 2,
  });
}
