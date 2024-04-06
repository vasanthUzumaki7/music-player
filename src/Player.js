import React, { useEffect, useRef, useState } from 'react'
import song1 from './songs/1.mp3';
import song2 from './songs/2.mp3';
import song3 from './songs/3.mp3';
import song4 from './songs/4.mp3';
import img1 from './pictures/1.jpg'
import img2 from './pictures/2.jpg'
import img3 from './pictures/3.jpg'
import img4 from './pictures/4.jpg'
import { IoPlayCircle } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { IoPlaySkipBackSharp } from "react-icons/io5";
import { FaPauseCircle } from "react-icons/fa";
import './player.css'

const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [songIndex, setSongIndex] = useState(0)
    const [initialLoad, setInitialLoad] = useState(true)
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const[showList,setShowlist]=useState(true)
    const audioplayer = useRef()

    const tracks = [
        {
            name: 'Aadatha Aatamellam',
            director: 'Yuvan Shankar Raja',
            picture: img1,
            song: song1
        },
        {
            name: 'Aadi pona aavani',
            director: 'Santhosh narayanan',
            picture: img2,
            song: song2
        },
        {
            name: 'Aaluma Doluma',
            director: 'Aniruth',
            picture: img3,
            song: song3
        },
        {
            name: 'Aanantha Yazhai',
            director: 'Sriram parthasarathy',
            picture: img4,
            song: song4
        }
    ];

    useEffect(() => {
        // Start playing the audio when the component mounts if it's not the initial load
        if (!initialLoad) {
            playIndex(songIndex);
            setIsPlaying(true);
        } else {
            // Pause the player on initial load
            setIsPlaying(false);
        }
        setInitialLoad(false); // Update initial load state after the first load
    }, []); // Empty dependency array ensures this effect runs only once on mount

    useEffect(() => {
        const player = audioplayer.current
        if (isPlaying) {
            player.play()
        } else {
            player.pause()
        }
        return () => {
            player.pause()
        }
    }, [isPlaying, songIndex])

    const handlePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const playIndex = (index) => {
        setSongIndex(index)
    }

    const nextSong = () => {
        setSongIndex((songIndex + 1) % tracks.length)
    }

    const prevSong = () => {
        setSongIndex((songIndex - 1 + tracks.length) % tracks.length)
    }
    //progress of song
    const progressUpdate=()=>{
        const player=audioplayer.current
        setCurrentTime(player.currentTime)
        setDuration(player.duration)

    }


    //to show the duration
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

      // Function to handle seeking by updating the current time of the audio player
      const handleSeek = (e) => {
        const player = audioplayer.current;
        const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
        player.currentTime = seekTime;
        setCurrentTime(seekTime);
    };


    //songlist

    const displayblock={
        position:'absolute',
        backgroundColor: 'black',
        top: '0',
        right: '0px'
    }
    
    const displaynone={
        position: 'fixed',
        transitionDuration: '1s', // Corrected property name
        transitionTimingFunction: 'ease-in-out', // Corrected property name
        top: '0',
        right: '-300px'
    }
    

    const songlist=()=>{
        setShowlist(!showList)
    }
    const songliststyle=showList?displaynone:displayblock;

    // Function to play the selected song from the list
    const playSong = (index) => {
        setSongIndex(index);
        setIsPlaying(true);
    }

    return (
        <div>
            <div className='container'>
                <div className='container-outer'>
                <div className='about-container'>
                <img src={tracks[songIndex].picture} alt={tracks[songIndex].name} />
                <h3 style={{marginTop:'10px'}}>{tracks[songIndex].name}</h3>
                <h4 style={{marginTop:'10px'}}>{tracks[songIndex].director}</h4>
                </div>
                <div className='progress-container'>
                <p> {formatTime(currentTime)}</p>
                
                <audio src={tracks[songIndex].song} ref={audioplayer} onTimeUpdate={progressUpdate} onEnded={nextSong}/>
                <div className='progress-progress' onClick={handleSeek} style={{ cursor: 'pointer' }}>
                    <progress value={currentTime} max={duration} />
                </div>
                <p>{formatTime(duration)}</p>
                </div>
                <div className='controls-container'>
                <IoPlaySkipBackSharp onClick={prevSong} className='prev-next'/>
                {isPlaying ? <FaPauseCircle onClick={handlePlay} className='play-btn' /> : <IoPlayCircle onClick={handlePlay} className='play-btn'/>}
                <IoPlaySkipForward onClick={nextSong} className='prev-next'/>
                </div>
                </div>
                <button onClick={songlist} className='library'>Library</button>
                <div style={songliststyle} className='songlist'>
                {tracks.map((item,index)=>(
                    <li key={index} onClick={() => playSong(index)}>{item.name}</li>
                ))}
                </div>

            </div>
        </div>
    )
}

export default Player
