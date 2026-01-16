import DailyForcast from "./DailyForcast";
import HourlyForecast from "./HourlyForecast";
import Tempdisplay from "./Tempdisplay";
import WeatherVariables from "./WeatherVariables";
import styles from "./MainLayout.module.css";

function Mainlayout() {
  return (
    <div className={styles.container}>
      <Tempdisplay />
      <HourlyForecast />
      <WeatherVariables />
      <DailyForcast />
    </div>
  );
}

export default Mainlayout;
