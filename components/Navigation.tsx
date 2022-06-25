import styles from "./Navigation.module.scss";

const Navigation = () => (
  <nav className={styles.nav}>
    <div className={styles.nav_container}>
      <div className={styles.nav_container_logo}></div>
      <div className={styles.nav_container_main}>
        <a href="#">Home</a>
        <a href="#">Leaderboards</a>
        <a href="#">Resources</a>
      </div>
      <div className={styles.nav_container_other}></div>
    </div>
  </nav>
);

export default Navigation;