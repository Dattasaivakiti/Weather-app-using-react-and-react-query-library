import styles from "./Properties.module.css";
function Properties({ label, value, units }) {
  return (
    <div className={styles.box}>
      <p className={styles.property}>{label}</p>
      <p className={styles.value}>
        {value} <span>{units}</span>
      </p>
    </div>
  );
}

export default Properties;
