import React from 'react'
import Link from 'next/link'

import { Note } from '../interfaces'

import styles from './Note.module.scss'

type Props = {
    data: Note
    remove: any,
    seek: any,
}

function to_hms(time: number) {
    let t = new Date(time * 1000);
    let sec = t.getUTCSeconds().toString().padStart(2,'0');
    let msec = t.getUTCMilliseconds().toString().padStart(3,'0');
    if(time < 60) {
        return `${sec}.${msec}`;
    }
    let min = t.getUTCMinutes().toString().padStart(2,'0');
    if(time < 60*60) {
        return `${min}:${sec}.${msec}`;
    }
    let hour = t.getUTCHours().toString();
    return `${hour}:${min}:${sec}.${msec}`;
}

const NoteItem = ({ data, remove, seek }: Props) => (
    <div className={styles.noteitem}>
      <div className={styles.text}>{data.text}</div>
      <Link href="#">
        <a className={styles.time} title="Go to time" onClick={(ev) => seek(ev, data.time)}>
          {to_hms(data.time)}
        </a>
      </Link>
      <Link href="#">
        <a className={styles.remove} title="Remove Note" onClick={(ev) => remove(ev, data.id)}>x</a>
      </Link>
      <ul className={styles.noteitemid}>
        <li>Note ID <b>{data.id}</b></li>
        <li>VideoID <b>{data.video_id}</b></li>
        <li>Time <b>{data.time.toFixed(3)}</b></li>
      </ul>
   </div>
)

export default NoteItem
