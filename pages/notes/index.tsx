import Link from 'next/link'
import fs from 'fs';
import { Note } from '../../interfaces'
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
  const [playing, setPlaying] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);

  const endpoint = '/api/notes'

  function yturl(id) {
    return `https://www.youtube.com/watch?v=${id}`
  }

  const loadVideo = async (event: any) => {
    event.preventDefault();
    const video_id = event.target.vid.value;
    setVideoUrl(yturl(video_id));
  }

  const handleSubmit = async (event: any) => {

    event.preventDefault()
    // Get data from the form.
    let time = ref.current.getCurrentTime();
    const xdata = {
      text: event.target.text.value,
      video_id: event.target.video_id.value,
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

  const handleRemove = async (id: number) => {
    //console.log("REMOVE", id);
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
    setVideoUrl(yturl(vid))
  }

  const seek = async (time: number) => {
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
    <div>{
      hasWindow &&
      <ReactPlayer url={videoUrl} ref={ref} controls playing={playing} />
    }
      <div>
        <form onSubmit={loadVideo}>
          <input type="text" id="vid"></input>
          <button>Load Video</button>
        </form>
      </div>
      <div>
        Current video '{videoUrl}'
      </div>
      <div><b>Video Control</b></div>
      <button onClick={() => frame_change(1)}>+1 Frame</button>
      <button onClick={() => frame_change(-1)}>-1 Frame</button>
      <button onClick={() => frame_change(30)}>+30 Frames</button>
      <button onClick={() => frame_change(-30)}>-30 Frames</button>
      <div><b>Note</b></div>
      <form onSubmit={handleSubmit}>
        <textarea id="text" rows="4" cols="50" name="text"></textarea>
        <input id="video_id" type="hidden" value="1234567" name="video_id"></input>
        <br />
        <button type="submit">Add for Current Time</button>
      </form>
      <div>
        <b>Notes</b>
        <ul>
          {data.map((note: any) => (
            <li key={note.id} >{note.text}
              <a href="#" onClick={() => seek(note.time)}>{note.time.toFixed(3)}</a>
              <button onClick={() => handleRemove(note.id)}>remove</button>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div>
        <ul>
          <li><a href="#" onClick={() => loadVideoID("5iVrLMDynsQ")}>5iVrLMDynsQ</a></li>
          <li><a href="#" onClick={() => loadVideoID("zFcdS_RDacQ")}>zFcdS_RDacQ</a></li>
        </ul>
      </div>

    </div>
  )
}
/*
        */
export default Notes
