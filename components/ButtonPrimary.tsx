import styles from './ButtonPrimary.module.scss';

type Props = {
  children?: string
  href?: string
}

const ButtonPrimary = ({children, href = "#"}: Props) => (
  <a href={href} className={styles.button}>{children}</a>
);

export default ButtonPrimary;