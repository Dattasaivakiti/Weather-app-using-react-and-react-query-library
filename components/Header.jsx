import styles from "./Header.module.css";
function Header() {
  return (
    <ul className={styles.header}>
      <li className={styles.list}>
        <img className={styles.img} src="/images/logo.svg" alt="welcome icon" />
      </li>
      <li className={styles.list}> units</li>
    </ul>
  );
}

export default Header;
