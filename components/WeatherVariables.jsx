import { useContext } from "react";
import Properties from "./Properties";
import styles from "./WeatherVariables.module.css";
import { Details } from "./DetailsProvider";
function WeatherVariables() {
  const { temp, isLoadingWeather, isErrorWeather } = useContext(Details);
  
  if (isLoadingWeather) {
    return (
      <div className={styles.container}>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (isErrorWeather || !temp || !temp.current) {
    return (
      <div className={styles.container}>
        <p>Unable to load weather variables</p>
      </div>
    );
  }
  const properties = [
    {
      id: 1,
      label: "Feels Like",
      value: temp.current.apparent_temperature,
      units: temp.current_units.apparent_temperature,
    },
    {
      id: 2,
      label: "Humidity",
      value: temp.current.relative_humidity_2m,
      units: temp.current_units.relative_humidity_2m,
    },
    {
      id: 3,
      label: "Wind",
      value: temp.current.wind_speed_10m,
      units: temp.current_units.wind_speed_10m,
    },
    {
      id: 4,
      label: "Precipitation",
      value: temp.current.precipitation,
      units: temp.current_units.precipitation,
    },
  ];
  return (
    <div className={styles.container}>
      {properties.map((properties) => {
        return (
          <Properties
            key={properties.id}
            label={properties.label}
            value={properties.value}
            units={properties.units}
          />
        );
      })}
    </div>
  );
}

export default WeatherVariables;
