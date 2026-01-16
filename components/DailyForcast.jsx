import { useContext } from "react";
import styles from "./DailyForecast.module.css";
import Day from "./Day.jsx";
import { Details } from "./DetailsProvider.jsx";
function DailyForcast() {
  const { temp, isLoadingWeather, isErrorWeather } = useContext(Details);
  
  if (isLoadingWeather) {
    return (
      <div>
        <h4>Daily Forecast</h4>
        <p>Loading...</p>
      </div>
    );
  }

  if (isErrorWeather || !temp || !temp.daily) {
    return (
      <div>
        <h4>Daily Forecast</h4>
        <p>Unable to load daily forecast</p>
      </div>
    );
  }
  const isDay = temp.current.is_day;

  const daily = {
    time: temp.daily.time,
    temp_max: temp.daily.temperature_2m_max,
    temp_min: temp.daily.temperature_2m_min,
    weatherCode: temp.daily.weather_code,
  };
  const dailyForcast = daily.time.map((date, index) => {
    const dayName = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });
    return {
      id: index,
      day: dayName,
      maxtemp: daily.temp_max[index],
      mintemp: daily.temp_min[index],
      weatherCode: daily.weatherCode[index],
    };
  });
  return (
    <div>
      <h4>Daily Forecast</h4>
      <div className={styles.column}>
        {dailyForcast.map((daily) => {
          return (
            <Day
              key={daily.id}
              day={daily.day}
              maxTemp={daily.maxtemp}
              minTemp={daily.mintemp}
              weatherCode={daily.weatherCode}
              isDay={isDay}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DailyForcast;
