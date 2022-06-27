import React from 'react';
import styles from './Banner.module.scss';

type Props = {
  children?: string
}

const Banner =({children}: Props) => (
  <div className= {styles.Banner}>
    <div className={styles.pageName}>
      <h1>{children}</h1>
    </div>
  </div>

)

export default Banner
