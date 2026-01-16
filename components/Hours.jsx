import styles from "./Hours.module.css";
import { getWeatherIcon } from "../utility/getWetherIcon";
function Hours({ hour, hourTemp, hWeatherCode, isDay }) {
  const imageSrc = getWeatherIcon(hWeatherCode, isDay);
  return (
    <div className={styles.hourCard}>
      <div className={styles.secondContainer}>
        <img
          className={styles.image}
          src={imageSrc}
          alt={`Weather icon for ${hour}`}
        />
        <p>{hour}</p>
      </div>
      <p>
        {hourTemp}
        <sup>o</sup>
      </p>
    </div>
  );
}

export default Hours;
