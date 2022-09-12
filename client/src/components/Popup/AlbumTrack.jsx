import React, { useState } from 'react'
import { addToQueue, pause, playTrack, removeFromQueue, removeSavedTrack, saveTrack } from '../../js/api';
import { msToTrackDuration } from '../../js/utils';

export default function AlbumTrack({ number, track, playing, getIds }) {
    const [added, setAdded] = useState(track.added);
    const [next, setNext] = useState(track.next);

    let duration = msToTrackDuration(track.duration_ms);
    let performer = track.artists.map(artist => artist.name).join(', ');

    const handleTrackSelect = () => {
        if (playing) {
            pause(track.id);
        }
        else {
            playTrack(track.id, 0, getIds());
            setNext(false);
        }
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
        <div className={`track-container ${playing ? 'activated' : ''}`}>
            <button onClick={handleTrackSelect} className="track-container__button-wrap"></button>
            <div className="track__number-wrap">
                <span className="track__number">{number}</span>
                <div className="play-pause-button-wrap">
                    <button onClick={handleTrackSelect} className={`play-pause-button ${playing ? 'activated' : ''}`}></button>
                </div>
            </div>
            <div className="track__title-wrap">
                <h3 className="track__title">{performer} - {track.name}</h3>
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
                    <button onClick={addTrack} className={`track__button add-button ${added ? "added" : ""}`}>
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
        </div >
    )
}
