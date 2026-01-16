import { createContext, useEffect, useState } from "react";
import { useGeocode } from "../src/hooks/useGeocode";
import { useWeather } from "../src/hooks/useWeather";
import { useReverseGeocode } from "../src/hooks/useReverse";

const Details = createContext();

function DetailsProvider({ children }) {
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  /* --------------------------------------------
     Load saved location once on app mount
  --------------------------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("weatherData");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (parsed?.location) {
        setLocation(parsed.location);
        setSearch(parsed.location);
      }
    } catch (err) {
      console.error("Failed to read localStorage:", err);
    }
  }, []);

  /* --------------------------------------------
     Geocode (ONLY when search is valid)
  --------------------------------------------- */
  const {
    data: coord = null,
    isLoading: isLoadingCoords,
    isError: isErrorCoords,
    error: coordsError,
  } = useGeocode(search, !!search?.trim());

  const hasCoords = !!coord?.lat && !!coord?.lon;

  /* --------------------------------------------
     Weather (ONLY when lat & lon exist)
  --------------------------------------------- */
  const {
    data: temp = null,
    isLoading: isLoadingWeather,
    isError: isErrorWeather,
    error: weatherError,
  } = useWeather(coord ?? {}, hasCoords);

  /* --------------------------------------------
     Reverse Geocode (ONLY when lat & lon exist)
  --------------------------------------------- */
  const { data: reverseGeoData = null } = useReverseGeocode(
    coord?.lat,
    coord?.lon,
    hasCoords
  );

  /* --------------------------------------------
     Persist weather + location
  --------------------------------------------- */
  useEffect(() => {
    if (!temp || !location) return;

    localStorage.setItem("weatherData", JSON.stringify({ temp, location }));
  }, [temp, location]);

  /* --------------------------------------------
     Context value
  --------------------------------------------- */
  return (
    <Details.Provider
      value={{
        // Input state
        location,
        setLocation,
        search,
        setSearch,

        // Data
        coord,
        temp,
        reverseGeoData,

        // Combined states
        isLoading: isLoadingCoords || isLoadingWeather,
        isError: isErrorCoords || isErrorWeather,
        error: coordsError || weatherError,

        // Granular states
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
