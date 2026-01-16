import { createContext, useEffect, useState } from "react";
import { useGeocode } from "../src/hooks/useGeocode";
import { useWeather } from "../src/hooks/useWeather";
import { useReverseGeocode } from "../src/hooks/useReverse";

const Details = createContext();

function DetailsProvider({ children }) {
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  // Load saved location from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("weatherData");
    if (saved) {
      try {
        const { location: savedLocation } = JSON.parse(saved);
        if (savedLocation) {
          setLocation(savedLocation);
          setSearch(savedLocation);
        }
      } catch (err) {
        console.error("Error loading saved data:", err);
      }
    }
  }, []);

  // Fetch coordinates using React Query
  const {
    data: coord,
    isLoading: isLoadingCoords,
    isError: isErrorCoords,
    error: coordsError,
  } = useGeocode(search, !!search?.trim());

  // Fetch weather data using React Query
  const {
    data: temp,
    isLoading: isLoadingWeather,
    isError: isErrorWeather,
    error: weatherError,
  } = useWeather(coord, !!coord?.lat && !!coord?.lon);

  const { data: reverseGeoData } = useReverseGeocode(coord?.lat, coord?.lon);

  // Save to localStorage when data changes
  useEffect(() => {
    if (temp && location) {
      localStorage.setItem("weatherData", JSON.stringify({ temp, location }));
    }
  }, [temp, location]);

  // Update location display name when coordinates are fetched
  useEffect(() => {
    if (coord?.displayName && !search.includes(coord.displayName)) {
      // Optionally update location with the full display name from API
      // This is optional - keeping user's input as-is for now
    }
  }, [coord, search]);

  return (
    <Details.Provider
      value={{
        location,
        setLocation,
        coord: coord || {},
        search,
        setSearch,
        reverseGeoData,
        temp: temp || {},
        // Loading and error states
        isLoading: isLoadingCoords || isLoadingWeather,
        isError: isErrorCoords || isErrorWeather,
        error: coordsError || weatherError,
        // Individual states for more granular control
        isLoadingCoords,
        isLoadingWeather,
        isErrorCoords,
        isErrorWeather,
        coordsError,
        weatherError,
      }}
    >
      {children}
    </Details.Provider>
  );
}

export { DetailsProvider, Details };
