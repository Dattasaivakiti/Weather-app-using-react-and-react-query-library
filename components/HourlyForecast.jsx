/*import { useContext } from "react";
import styles from "./HourlyForecast.module.css";
import Hours from "./Hours";
import { Details } from "./DetailsProvider";

function HourlyForecast({ className }) {
  const { temp } = useContext(Details);
  if (!temp || temp.hourly) {
    return <div>...loading</div>;
  }
  const date = temp.current.time;
  const currentHour = Number(date.slice(11, 13));
  const hours = temp.hourly.time;

  const hourlyVar = hours
    .map((time, index) => ({
      hour: Number(time.slice(11, 13)),
      hourTemp: temp.hourly.temperature_2m[index],
    }))
    .filter((obj) => obj.hour > currentHour)
    .slice(0, 7); // only next 7 hours

  return (
    <div className={className}>
      <ul className={styles.header}>
        <li className={styles.list}>Hourly Forcast</li>
        <li className={styles.list}>
          <select className={styles.options} name="" id="">
            <option> Sunday</option>
            <option> Monday</option>
            <option> Tuesday</option>
            <option> Wednesday</option>
            <option> Thrusday</option>
            <option> Friday</option>
            <option> Saturday</option>
          </select>
        </li>
      </ul>
      {hourlyVar.map((weather, index) => (
        <li key={weather.hour} className={styles.list}>
          <Hours hour={weather.hour} hourTemp={weather.hourTemp} />
        </li>
      ))}
    </div>
  );
}

export default HourlyForecast;*/

import { useContext } from "react";
import styles from "./HourlyForecast.module.css";
import Hours from "./Hours";
import { Details } from "./DetailsProvider";

// Utility function to convert 24-hour to 12-hour with AM/PM
function formatHour(hour24) {
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12} ${suffix}`;
}

function HourlyForecast() {
  const { temp, isLoadingWeather, isErrorWeather } = useContext(Details);

  if (isLoadingWeather) {
    return (
      <div className={styles.gridItem}>
        <p>Loading hourly forecast...</p>
      </div>
    );
  }

  if (isErrorWeather || !temp || !temp.current || !temp.hourly) {
    return (
      <div className={styles.gridItem}>
        <p>Unable to load hourly forecast</p>
      </div>
    );
  }
  const isDay = temp.current.is_day;

  const now = new Date();
  const currentHour = now.getHours(); // local current hour
  const hours = temp.hourly.time;

  // Convert API UTC time to local hours, pair with temperature, then convert to 12-hour format
  const hourlyVar = hours
    .map((time, index) => {
      const localHour = new Date(time + "Z").getHours(); // convert UTC to local
      return {
        hour: formatHour(localHour), // convert to 12-hour format
        hour24: localHour, // keep 24-hour for sorting if needed
        hourTemp: temp.hourly.temperature_2m[index],
        hWeatherCode: temp.hourly.weather_code[index],
      };
    })
    .filter((obj) => obj.hour24 >= currentHour) // filter next hours
    .slice(0, 7); // only next 7 hours

  return (
    <div className={styles.gridItem}>
      <ul className={styles.header}>
        <li className={styles.list}>Hourly Forecast</li>
        <li className={styles.list}>
          <select className={styles.options}>
            <option>Sunday</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>
        </li>
      </ul>
      {hourlyVar.map((weather, index) => (
        <Hours
          key={index}
          hour={weather.hour}
          hourTemp={weather.hourTemp}
          hWeatherCode={weather.HweatherCode}
          isDay={isDay}
        />
      ))}
    </div>
  );
}

export default HourlyForecast;
