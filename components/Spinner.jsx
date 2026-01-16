import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerCircle}></div>
    </div>
  );
}

export default Spinner;
