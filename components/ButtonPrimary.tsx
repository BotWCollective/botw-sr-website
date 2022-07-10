import styles from './ButtonPrimary.module.scss';
import Link from 'next/link';

type Props = {
  children?: string
  href?: string
  onClick?: any
}

const ButtonPrimary = ({children, href = "#", onClick=""}: Props) => (
  <Link href={href} ><a onClick={onClick} className={styles.button}>{children}</a></Link>
);

export default ButtonPrimary;