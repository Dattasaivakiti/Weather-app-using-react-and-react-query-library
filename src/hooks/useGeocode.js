import { useQuery } from "@tanstack/react-query";

/**
 * Fetches coordinates for a given city and country using OpenStreetMap Nominatim API
 * @param {string} search - Search query in format "city, country"
 * @returns {Object} Query result with coordinates data
 */
export function useGeocode(search) {
  return useQuery({
    queryKey: ["geocode", search],
    queryFn: async () => {
      if (!search) return null;

      const [city, country] = search.split(",").map((s) => s.trim());

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          `city=${encodeURIComponent(city)}` +
          `&country=${encodeURIComponent(country)}` +
          `&format=json&limit=1`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch coordinates");
      }

      const data = await response.json();
      console.log(data);

      if (!data.length) {
        throw new Error("Location not found");
      }

      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        displayName: data[0].display_name,
      };
    },
    enabled: !!search, // Only run query when search is provided
    staleTime: 10 * 60 * 1000, // Coordinates don't change often, cache for 10 minutes
    retry: 1,
  });
}
