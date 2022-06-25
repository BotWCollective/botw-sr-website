import Link from 'next/link'
import NoteItem from '../../components/Note'
import { useState, useEffect } from 'react'
import React from 'react';
//import dynamic from 'next/dynamic'
//const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });
import ReactPlayer from 'react-player/youtube';
import styles from './index.module.scss'

function Notes() {

    const ref = React.useRef<ReactPlayer>(null);

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
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
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                throw new Error(`${res.status}: ${res.statusText}`);
            })
            .then((data) => {
                setData(data)
                setLoading(false)
            })
            .catch((error) => {
                setErrorMsg(error.toString());
            })
    }, [])

    if (errorMsg) return <div>{errorMsg}</div>;
    if (isLoading) return <div>loading...</div>;
    if (!data) return <div> No Data</div>;
    
    return (
        <div className={styles.notes}>
          <div className={styles.columns}>
            <div className={styles.current_notes}>
              <div className={styles.current_notes_header}><b>Notes</b></div>
              <ul className={styles.current_notes_notes}>
                {data.map((note: any) => (
                <li key={note.id}>
                  <NoteItem data={note} seek={seek} remove={handleRemove}></NoteItem>
                </li>))}
              </ul>
            </div>
            <div>
              <div className={styles.player}>{
                  hasWindow &&
                      <ReactPlayer url={videoUrl} ref={ref} controls playing={playing} />
              }
              </div>
              <div className={styles.video_current}>
                <div>Current video '{videoUrl}'</div>
              </div>
              <div className={styles.video_control}>
                <div><b>Video Control</b></div>
                <div className={styles.button_row}>
                  <button className={styles.button} onClick={() => frame_change(1)}>+1 Frame</button>
                  <button className={styles.button} onClick={() => frame_change(-1)}>-1 Frame</button>
                  <button className={styles.button} onClick={() => frame_change(30)}>+30 Frames</button>
                  <button className={styles.button} onClick={() => frame_change(-30)}>-30 Frames</button>
                </div>
              </div>
              <div className={styles.new_note}>
                <div><b>Note</b></div>
                <form onSubmit={handleSubmit}>
                  <textarea id="text" rows="4" cols="50" name="text"></textarea>
                  <br />
                  <button type="submit">Add for Current Time</button>
                </form>
              </div>
              <div className={styles.video_load}>
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
        </div>
    )
}

export default Notes
