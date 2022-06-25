import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footer_grid}>
      <div className={styles.footer_grid_left}>
        <h3>Fort Hateno</h3>
        <p>
          See the source code on&nbsp;
          <Link href="https://github.com/BotWCollective/botw-sr-website">
            <a>Github</a>
          </Link>
        </p>
      </div>
      <div className={styles.footer_grid_right}>
        <h3>The Hylian Collective</h3>
        <p>
          Join our&nbsp;
          <Link href="https://discord.gg/hylian">
            <a>Discord</a>
          </Link>
        </p>
        <p>
          Find us on&nbsp;
          <Link href="https://twitch.tv/botwcollective">
            <a>Twitch</a>
          </Link>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
