import Button from './ButtonPrimary';
import styles from './Card.module.scss';

type Props = {
  heading?: string
  children?: string
  link?: string
  heading_icon?:string
}


const Card = ({heading, children, link}: Props) => (
  <div className={styles.card}>
    <div>
      <div className={styles.card_heading}>
        <h3>{heading}</h3>
      </div>
      <div className={styles.card_content}>
        <p>{children}</p>
        <Button>{link}</Button>
      </div>
    </div>
  </div>
);

export default Card;