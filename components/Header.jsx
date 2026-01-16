import styles from "./Header.module.css";
import logo from "../public/images/logo.svg";
function Header() {
  return (
    <ul className={styles.header}>
      <li className={styles.list}>
        <img className={styles.img} src={logo} alt="welcome icon" />
      </li>
      <li className={styles.list}> units</li>
    </ul>
  );
}

export default Header;
