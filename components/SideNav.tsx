import React, { ReactPropTypes } from 'react';
import styles from './SideNav.module.scss'

type Props = {
  list?: string 
  link?: string
}
const ListArray = ({list}: Props) => [list]
const LinkArray = ({link}: Props) => [link]

const NavigationAnchor = ({list}: Props) => (
  <div className= {styles.SideNav}>
    <ul>
      <li><a>{ListArray}</a></li>
    </ul>
  </div>
)


export default NavigationAnchor
