/*import styles from "./TempDisplay.module.css";
import { Details } from "./DetailsProvider";
import { useContext } from "react";
function Tempdisplay() {
  const { location, temp } = useContext(Details);
  const temps = temp.hourly.temperature_2m;
  const times = temp.hourly.time;
  const now = new Date();
  const currentHourISO = now.toISOString().slice(0, 13) + ":00";
  const index = times.findIndex((t) => t === currentHourISO);

  let currentTemp;
  if (index !== -1) {
    currentTemp = temps[index];
    console.log("Current temperature:", currentTemp + "°C");
  } else {
    console.warn("Current hour not found in API data");
  }

  return (
    <div className={styles.temp}>
      <div>
        <p>{location}</p>
        <p>Tuesday,Aug 5,2025</p>
      </div>
      <div className={styles.seconddiv}>
        <img className={styles.img} src="/images/icon-sunny.webp" alt="sunny" />
        <p>
          {currentTemp}
          <sup>o</sup>
        </p>
      </div>
    </div>
  );
}

export default Tempdisplay;*/
import styles from "./TempDisplay.module.css";
import { Details } from "./DetailsProvider";
import { useContext } from "react";
import { getWeatherIcon } from "../utility/getWetherIcon";

function Tempdisplay() {
  const {
    location,
    temp,
    isLoadingWeather,
    isErrorWeather,
    weatherError,
    geoReverseData,
    search,
  } = useContext(Details);

  if (isLoadingWeather) {
    return (
      <div className={styles.temp}>
        <p className={styles.location}>
          {geoReverseData?.city}, {geoReverseData?.country}
        </p>

        <p className={styles.date}>Loading weather data...</p>
      </div>
    );
  }

  if (isErrorWeather || !temp || !temp.hourly) {
    return (
      <div className={styles.temp}>
        <p className={styles.location}>{location || "Error"}</p>
        <p className={styles.date}>
          {weatherError?.message || "Failed to load weather data"}
        </p>
      </div>
    );
  }

  const temps = temp.hourly.temperature_2m;
  const times = temp.hourly.time;
  const weatherCodes = temp.hourly.weather_code;

  const now = new Date();
  const currentHourISO = now.toISOString().slice(0, 13) + ":00";
  const index = times.findIndex((t) => t === currentHourISO);

  const currentTemp = index !== -1 ? temps[index] : null;
  const currentWeatherCode = index !== -1 ? weatherCodes[index] : 0;
  const isDay = temp.current?.is_day ?? true;
  
  const weatherIconSrc = getWeatherIcon(currentWeatherCode, isDay);

  return (
    <div className={styles.temp}>
      <div>
        <p className={styles.location}>{search}</p>
        <p className={styles.date}>{now.toDateString()}</p>
      </div>

      <div className={styles.seconddiv}>
        <img
          className={styles.img}
          src={weatherIconSrc}
          alt="Current weather"
        />

        <p className={styles.current}>
          {currentTemp !== null ? (
            <>
              {currentTemp}
              <sup>°</sup>C
            </>
          ) : (
            "--"
          )}
        </p>
      </div>
    </div>
  );
}

export default Tempdisplay;
