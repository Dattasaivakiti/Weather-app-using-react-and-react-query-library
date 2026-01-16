// hooks/useReverseGeocode.js
import { useQuery } from "@tanstack/react-query";
import { fetchReverseGeocode } from "./../../utility/reveseGeoCoding";

export function useReverseGeocode(lat, lon) {
  return useQuery({
    queryKey: ["reverse-geocode", lat, lon],
    queryFn: fetchReverseGeocode,
    enabled: !!lat && !!lon,
    staleTime: Infinity, // location name never changes
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}
