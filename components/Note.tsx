import React from 'react'
import Link from 'next/link'

import { Note } from '../interfaces'

type Props = {
data: Note
remove: any,
seek: any,
}

function to_hms(t: number) {
   let str = new Date(t * 1000).toISOString();
   if(t < 60) {
      return str.substr(17, 6);
   } else if(t < 60*60) {
      return str.substr(14, 9);
   }
   return str.substr(11, 12);
}

const NoteItem = ({ data, remove, seek }: Props) => (
   <div className="noteitem">
     <div className="text">{data.text}</div>
     <Link href="#" ><a className="time" title="Go to time" onClick={(ev) => seek(ev, data.time)}>{to_hms(data.time)}</a></Link>
     <Link href="#"><a className="remove" title="Remove Note" onClick={(ev) => remove(ev, data.id)}>x</a></Link>
     <ul className="noteitemid">
       <li>Note ID <b>{data.id}</b></li>
       <li>VideoID <b>{data.video_id}</b></li>
       <li>Time <b>{data.time.toFixed(3)}</b></li>
     </ul>
     <style jsx>{`
		  .noteitem {
		    border: 1px solid #e0e0e0;
        border-radius: 5px;
        background: #f0f0f0;
        padding: 0.15em 0.5em;
        margin: 5px;
        position: relative;
   	}
 .time {
     border: 0px solid red;
     display: inline;
     margin: 40px 10px 30px 0px;
     padding: 0;
 }
 .text {
     border: 0px solid red;
     inline-size: 350px;
     margin-right: 20px;
     overflow-wrap: break-word;
     hyphens: manual;
     white-space: pre-wrap;
     overflow-y: scroll;
     max-height: 4em;
 }
 .remove {
     border: 0px solid red;
     position: absolute;
     top: 0;
     right: 0;
     padding-right: 5px;
     padding-top: 0px;
     display: block;
 }
 .noteitem:hover {
     background: #e0e0e0;
 }
 .noteitemid {
     border: 0px solid red;
     display: block;
     font-size: 0.7em;
     padding: 0;
     text-align: right;
 }
 .noteitemid li {
     list-style-type: none;
 }
     a {
       padding-left: 0px;
       padding-right: 0px;
     }
     
		`}</style>
   </div>
)

export default NoteItem
