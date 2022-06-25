import styles from "./Navigation.module.scss";
import svg_mode_dark from "../public/images/dark_mode.svg";
import svg_mode_light from "../public/images/light_mode.svg";

const Navigation = () => (
  <nav className={styles.nav}>
    <img src={svg_mode_dark} alt="Dark Mode" className={styles.nav_themeToggle}/>
  </nav>
);

export default Navigation;