import { getWeatherIcon } from "../utility/getWetherIcon";
import styles from "./Day.module.css";
function Day({ day, maxTemp, minTemp, weatherCode, isDay }) {
  const imageSrc = getWeatherIcon(weatherCode, isDay);
  return (
    <div className={styles.dayBox}>
      <p className={styles.day}>{day}</p>
      <img
        className={styles.image}
        src={imageSrc}
        alt={`Weather icon for ${day}`}
      />
      <p className={styles.temp}>
        <span className={styles.value}>
          {maxTemp} <sup>o</sup>
        </span>{" "}
        <span className={styles.value}>
          {minTemp} <sup>o</sup>
        </span>
      </p>
    </div>
  );
}

export default Day;
