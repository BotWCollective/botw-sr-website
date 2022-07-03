import React from 'react';
import styles from './SideNav.module.scss'

type Props = {
  list1?: string
  list2?: string
  list3?: string
  list4?: string 
}
//hardcoding the number of elements in the list should be fine because this module is only be used once (in the guides page)

const NavigationAnchor = ({list1,list2,list3,list4,}: Props) => (
  <div className= {styles.SideNav}>
    <ul>
      <li><a href='#'>{list1}</a></li>
      <li><a href='#'>{list2}</a></li>
      <li><a href='#'>{list3}</a></li>
      <li><a href='#'>{list4}</a></li>
    </ul>
  </div>
)


export default NavigationAnchor
