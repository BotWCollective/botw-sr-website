import styles from "./Navigation.module.scss";
import Link from 'next/link';
import { useRouter } from "next/router";
import logo from "../public/images/logo.png"

const theme_toggle = <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 31q2.9 0 4.95-2.05Q31 26.9 31 24q0-2.9-2.05-4.95Q26.9 17 24 17q-2.9 0-4.95 2.05Q17 21.1 17 24q0 2.9 2.05 4.95Q21.1 31 24 31Zm0 3q-4.15 0-7.075-2.925T14 24q0-4.15 2.925-7.075T24 14q4.15 0 7.075 2.925T34 24q0 4.15-2.925 7.075T24 34ZM3.5 25.5q-.65 0-1.075-.425Q2 24.65 2 24q0-.65.425-1.075Q2.85 22.5 3.5 22.5h5q.65 0 1.075.425Q10 23.35 10 24q0 .65-.425 1.075-.425.425-1.075.425Zm36 0q-.65 0-1.075-.425Q38 24.65 38 24q0-.65.425-1.075.425-.425 1.075-.425h5q.65 0 1.075.425Q46 23.35 46 24q0 .65-.425 1.075-.425.425-1.075.425ZM24 10q-.65 0-1.075-.425Q22.5 9.15 22.5 8.5v-5q0-.65.425-1.075Q23.35 2 24 2q.65 0 1.075.425.425.425.425 1.075v5q0 .65-.425 1.075Q24.65 10 24 10Zm0 36q-.65 0-1.075-.425-.425-.425-.425-1.075v-5q0-.65.425-1.075Q23.35 38 24 38q.65 0 1.075.425.425.425.425 1.075v5q0 .65-.425 1.075Q24.65 46 24 46ZM12 14.1l-2.85-2.8q-.45-.45-.425-1.075.025-.625.425-1.075.45-.45 1.075-.45t1.075.45L14.1 12q.4.45.4 1.05 0 .6-.4 1-.4.45-1.025.45-.625 0-1.075-.4Zm24.7 24.75L33.9 36q-.4-.45-.4-1.075t.45-1.025q.4-.45 1-.45t1.05.45l2.85 2.8q.45.45.425 1.075-.025.625-.425 1.075-.45.45-1.075.45t-1.075-.45ZM33.9 14.1q-.45-.45-.45-1.05 0-.6.45-1.05l2.8-2.85q.45-.45 1.075-.425.625.025 1.075.425.45.45.45 1.075t-.45 1.075L36 14.1q-.4.4-1.025.4-.625 0-1.075-.4ZM9.15 38.85q-.45-.45-.45-1.075t.45-1.075L12 33.9q.45-.45 1.05-.45.6 0 1.05.45.45.45.45 1.05 0 .6-.45 1.05l-2.8 2.85q-.45.45-1.075.425-.625-.025-1.075-.425ZM24 24Z"/></svg>;

const navLinks = [
  {title: "Home", path: "/"},
  {title: "Leaderboards", path: "/leaderboards"},
  {title: "Resources", path: "/resources"},
];

const Navigation = () => (
  <nav className={styles.nav}>
    <div className={styles.nav_container}>
      <div className={styles.nav_container_logo}>
        <Link href="/">
          <a className={styles.nav_container_logo_link}>
            <img src={logo.src} alt="Fort Hateno" />
          </a>
        </Link>
      </div>
      <div className={styles.nav_container_main}>
        {navLinks.map((link) => (
          <Link href={link.path} passHref>
            <a className={useRouter().pathname === link.path ? styles.active : ""}>{link.title}</a>
          </Link>
        ))}
      </div>
      <div className={styles.nav_container_other}>
        <button>{theme_toggle}</button>
        <Link href="#"><a>Log In</a></Link>
      </div>
    </div>
  </nav>
);

export default Navigation;