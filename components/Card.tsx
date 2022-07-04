import Button from './ButtonPrimary';
import styles from './Card.module.scss';

type Props = {
  heading?: string
  children?: string
  link?: string
  href?:string
  headingIcon?:string
  backgroundImage?:string
}

export default function Card({heading, children, link, href, headingIcon, backgroundImage}: Props) {

  const styling = {
    '--background-image': `url(${backgroundImage})`,
    '--heading-icon': `url(${headingIcon})`,
    color: "currentColor"
  }

  return (
    <div className={styles.card} style={styling}>
      <div>
        <div className={styles.card_heading}>
          <h3>{heading}</h3>
        </div>
        <div className={styles.card_content}>
          <p>{children}</p>
          <Button href={href}>{link}</Button>
        </div>
      </div>
    </div>
  )
}