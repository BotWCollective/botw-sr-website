import Link from 'next/link'
import NoteItem from '../../components/Note'
import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import React from 'react';
import { useUser } from '../../lib/hooks'
import ReactPlayer from 'react-player/youtube';

import styles from './index.module.scss'

function Notes() {

    const user = useUser({ redirectTo: '/', allowed_roles: ['editor'] });

    const ref = React.useRef<ReactPlayer>(null);

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [videoUrl, setVideoUrl] = useState('');
    const [videoID, setVideoID] = useState({id: '', server: ''});
    const [playing, setPlaying] = useState(false);
    const [hasWindow, setHasWindow] = useState(false);
    const [videos, setVideos] = useState([]);

    const endpoint = '/api/notes'

    function yturl(id) {
        return `https://www.youtube.com/watch?v=${id}`
    }

    // Update video and notes on videoID changes
    useEffect(() => {
        if(videoID.server == 'youtube') {
            setVideoUrl(yturl(videoID.id));
        }
        if(videoID.server == 'twitter') {
            setVideoUrl(videoID.id);
        }
        // Update Notes
        updateData();
    }, [videoID]);

    const loadVideo = async (event: any) => {
        event.preventDefault();
        loadVideoID(event.target.vid.value, 'youtube');
    }

    const loadVideoID = async (id: string, server: string) => {
        setVideoID({id: id, server: server});
    }

    const handleSubmit = async (event: any) => {

        event.preventDefault()
        // Get data from the form.
        let time = 0;
        if(ref.current) { 
            time = ref.current.getCurrentTime();
        }
        const xdata = {
            text: event.target.text.value,
            video_id: videoID.id,
            server: videoID.server,
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

    const updateData = async() => {
        const url = `/api/notes/video_id/${videoID.id}`;
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
    }

    const updateVideos = async() => {
        const url = '/api/notes/videos';
        fetch(url)
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                throw new Error(`${res.status}: ${res.statusText}`);
            })
            .then((data) => {
                setVideos(data);
            })
            .catch((error) => {
                console.log(error.toString());
            });
    }
    
    const url = '/api/notes';

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
        updateData();
        updateVideos();
    }, [])

    if (errorMsg) return <div>{errorMsg}</div>;
    if (isLoading) return <div>loading...</div>;
    if (!data) return <div> No Data</div>;

    let notes = "No Notes";
    if(data.length > 0) {
        notes = data.map((note: any) => (
            <li key={note.id}>
              <NoteItem data={note} seek={seek} remove={handleRemove}></NoteItem>
            </li>))
    }
    let player = '';
    if(hasWindow) {
        if(videoID.server == 'youtube') {
            player = (<ReactPlayer url={videoUrl} ref={ref} controls playing={playing} />);
        }
        if(videoID.server == 'twitter') {
            // Twitter content is blocked due to trackers :|
            const url = `https://twitter.com/user/status/${videoID.id}`;
            player = ( <div className={styles.twitter_link}><a href={url}>{url}</a></div>)
        }
    }

    let output = videos.map((video: any) => {
            return (
                <li key={video.video_id}>
                  <a href="#"
                     onClick={ ev => loadVideoID(video.video_id, video.server) }
                    >
                    {video.text}
                  </a>
                </li>
            )})
                 
    
    return (
        <Layout user={user}>
        <div className={styles.notes}>
          <div className={styles.columns}>
            <div className={styles.current_notes}>
              <div className={styles.current_notes_header}><b>Notes</b></div>
              <ul className={styles.current_notes_notes}>{notes}</ul>
            </div>
            <div>
              <div className={styles.player}>{player}</div>
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
                  {output}
                </ul>
              </div>
            </div>
          </div>
        </div>
        </Layout>
    )
}

export default Notes
