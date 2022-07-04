import styles from './ButtonPrimary.module.scss';
import Link from 'next/link';

type Props = {
  children?: string
  href?: string
}

const ButtonPrimary = ({children, href = "#"}: Props) => (
  <Link href={href}><a className={styles.button}>{children}</a></Link>
);

export default ButtonPrimary;