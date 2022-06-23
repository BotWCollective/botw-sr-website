import Link from 'next/link'
import fs from 'fs';
import NoteItem from '../../components/Note'
import { useState, useEffect } from 'react'
import React from 'react';
//import dynamic from 'next/dynamic'
//const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });
import ReactPlayer from 'react-player/youtube';


function Notes() {

  const ref = React.useRef<ReactPlayer>(null);

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState('');
  const [videoID, setVideoID] = useState('');
  const [playing, setPlaying] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);

  const endpoint = '/api/notes'

  function yturl(id) {
    return `https://www.youtube.com/watch?v=${id}`
  }

  const loadVideo = async (event: any) => {
    event.preventDefault();
    setVideoID(event.target.vid.value);
    setVideoUrl(yturl(event.target.vid.value));
  }

  const handleSubmit = async (event: any) => {

    event.preventDefault()
    // Get data from the form.
    let time = ref.current.getCurrentTime();
    const xdata = {
      text: event.target.text.value,
      video_id: videoID,
      time: time,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(xdata),
    }
    const response = await fetch(endpoint, options)
    const result = await response.json()
    setData([...data, ...result]);
  }

  const handleRemove = async (event: any, id: number) => {
    event.preventDefault();
    const options = {
      method: 'DELETE',
    };
    let url = `${endpoint}/${id}`;
    const response = await fetch(url, options)
    if (response.ok) {
      setData(data.filter((item) => item.id !== id));
    }
  }

  const loadVideoID = async (vid: string) => {
    setVideoID(vid);
    setVideoUrl(yturl(vid))
  }

  const seek = async (event: any, time: number) => {
    event.preventDefault();
    ref.current.seekTo(time);
  }

  const play = async (time: number) => {
    setPlaying(true);
  }

  const pause = async (time: number) => {
    setPlaying(false);
  }
  const frame_change = async (frames: number) => {
    let sec_per_frame = 1.0 / 30.0;
    let t = ref.current.getCurrentTime();
    t = t + (sec_per_frame * frames);
    if (t < 0.0) {
      t = 0.0;
    }
    ref.current.seekTo(t);
  }

  const url = '/api/notes';

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])



  if (!data) return <div> No Data</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="notes">
      <div className="columns">
        <div className="current_notes">
          <div className="current_notes_header"><b>Notes</b></div>
          <ul className="current_notes_notes">
            {data.map((note: any) => (<li key={note.id}><NoteItem data={note} seek={seek} remove={handleRemove}></NoteItem></li>))}
          </ul>
        </div>
        <div>
          <div className="player">{
            hasWindow &&
            <ReactPlayer url={videoUrl} ref={ref} controls playing={playing} />
            }
          </div>
          <div className="video_current">
            <div>Current video '{videoUrl}'</div>
          </div>
          <div className="video_control">
            <div><b>Video Control</b></div>
            <div className="button_row">
              <button onClick={() => frame_change(1)}>+1 Frame</button>
              <button onClick={() => frame_change(-1)}>-1 Frame</button>
              <button onClick={() => frame_change(30)}>+30 Frames</button>
              <button onClick={() => frame_change(-30)}>-30 Frames</button>
            </div>
          </div>
          <div className="new_note">
            <div><b>Note</b></div>
            <form onSubmit={handleSubmit}>
              <textarea id="text" rows="4" cols="50" name="text"></textarea>
              <br />
              <button type="submit">Add for Current Time</button>
            </form>
          </div>
          <div className="video_load">
            <form onSubmit={loadVideo}>
              <input type="text" id="vid"></input>
              <button>Load Video</button>
            </form>
          </div>
          <div>
            <ul>
              <li><a href="#" onClick={() => loadVideoID("5iVrLMDynsQ")}>5iVrLMDynsQ</a></li>
              <li><a href="#" onClick={() => loadVideoID("zFcdS_RDacQ")}>zFcdS_RDacQ</a></li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
      body {
    }
 .columns {
     display: flex;
     
 }
     button {
        display: inline-block;
        padding: 0.15em 1.0em;
        border: 0.1em solid #000000;
        margin: 0 0.3em 0.3em 0;
        box-sizing: border-box;
        text-decoration: none;
        font-weight: 300;
        color: #000000;
        text-align:center;
        border-radius: 0.12em;
    }
     button:hover {
       color: #000000;
       background-color: #eeeeee;
     }
     .video_load {
         border: 0px solid purple;
         display: flex;
         flex-flow: row nowrap;
         justify-content: center;
         align-items: center;
     }
     .video_current {
         border: 0px solid red;
         display: flex;
         justify-content: center;
         align-items: center;
     }
     .video_control {
         border: 0px solid lime;
         display: flex;
         flex-flow: column nowrap;
         justify-content: center;
         align-items: center;
     }
     .button_row {
         border: 0px solid red;
         display: flex;
         flex-flow: row wrap;
         justify-content: center;
         align-items: center;
     }
     .new_note {
         display: flex;
         flex-flow: column nowrap;
         justify-content: center;
         align-items: center;
     }
     .current_notes {
         display: flex;
         flex-flow: column nowrap;
         justify-content: center;
         align-items: center;
         order: 1;
         overflow-y: scroll;
         max-height: calc(70vh);
     }
     .current_notes  ul  li {
         list-style-type: none;
     }
     .current_notes_notes {
         height: calc(100% - 5em);
     }
         
     .notes {
         font-family: Arial, Helvetica, sans-serif;
         border: 0px solid black;
         display: flex;
         flex-flow: column wrap;
         justify-content: center;
         align-content: center;
         gap: 10px;
     }
     .button_row {
         display: flex;
     }
		`}</style>

      </div>
  )
}
/*
        */
export default Notes
