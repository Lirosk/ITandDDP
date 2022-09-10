import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addToQueue, pause, playTrack, removeFromQueue, removeSavedTrack, saveTrack } from '../js/api';
import { msToTrackDuration } from '../js/utils';

export default function TrackContainer(props) {
    const track = props.track;

    const playing = props.playing;
    const setPlayingId = props.setPlayingId;

    const [added, setAdded] = useState(track.added);
    const [next, setNext] = useState(track.next);

    let duration = msToTrackDuration(track.duration_ms);
    let performer = track.artists.map(artist => artist.name).join(', ');
    let imageUrl = track.images[2] ? track.images[2].url : "";

    const handleTrackSelect = () => {
        if (playing) {
            pause(track.id);
        }
        else {
            playTrack(track.id);
            setNext(false);
        }

        setPlayingId(track.id);
    };

    const addTrack = () => {
        if (added) {
            removeSavedTrack(track.id);
        }
        else {
            saveTrack(track.id);
        }

        setAdded(!added);
    };

    const playNext = () => {
        if (next) {
            removeFromQueue(track.id);
        }
        else {
            addToQueue(track.id);
        }

        setNext(!next);
    };

    return (
        <div className={`track-container ${playing ? 'activated' : ''}`} data-id={track.id}>
            <button onClick={handleTrackSelect} className="track-container__button-wrap"></button>
            <div className="track__cover-wrap">
                <img className="track__cover" src={imageUrl} />
                <div className="play-pause-button-wrap">
                    <button onClick={handleTrackSelect} className={`play-pause-button ${playing ? 'activated' : ''}`}></button>
                </div>
            </div>
            <div className="track__title-wrap">
                <div className="audio__title">
                    <div className="audio__title__text-wrap">
                        <span className="song__title">
                            {track.name}
                        </span>
                    </div>
                    <div className="audio__title__text-wrap">
                        <Link className="song__performer" to={`search?q=${encodeURIComponent(performer)}`}>
                            {performer}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="track__buttons-container">
                <div className="track__button-wrap">
                    <button onClick={playNext} className={`track__button play-next-button ${next ? 'activated' : ''}`}>
                        <svg className="icon play-next">
                            <line x1="0" x2="13" y1="1" y2="1" />
                            <line x1="0" x2="6" y1="7" y2="7" />
                            <line x1="0" x2="6" y1="13" y2="13" />
                            <polygon points="9 7, 9 12, 13 9.5" />
                        </svg>
                        <svg className="icon remove-next">
                            <line x1="0" x2="13" y1="1" y2="1" />
                            <line x1="0" x2="6" y1="7" y2="7" />
                            <line x1="0" x2="6" y1="13" y2="13" />
                            <polyline points="8 8, 13 13" />
                            <polyline points="8 13, 13 8" />
                        </svg>
                    </button>
                </div>
                <div className="track__button-wrap">
                    <button onClick={addTrack} className={`track__button add-button ${added ? 'added' : ''}`} >
                        <svg className="icon add">
                            <line x1="0" x2="14" y1="7" y2="7" />
                            <line x1="7" x2="7" y1="0" y2="14" />
                        </svg>
                        <svg className="icon remove">
                            <line x1="1" x2="13" y1="1" y2="13" />
                            <line x1="1" x2="13" y1="13" y2="1" />
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                <span className="track__duration">{duration}</span>
            </div>
        </div>
    )
}
