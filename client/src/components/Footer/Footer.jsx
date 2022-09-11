import React, { useState } from 'react'
import { useEffect } from 'react';
import { getLastPlayedTrack, playNext, playPrevious, playTrack, seekTo, setVolume as apiSetVolume, setRepeat as apiSetRepeat, setShuffle as apiSetShuffle, pause } from '../../js/api';
import { playerStateTracker } from '../../js/controllers/player_state_tracker';
import { msToTrackDuration } from '../../js/utils';

import ProgressSlider from './ProgressSlider';
import VolumeSlider from './VolumeSlider';

import '../../styles/components/footer.css';


export function Footer({ signedIn }) {
    if (!signedIn) {
        return null;
    }

    const [track, setTrack] = useState({});
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);

    useEffect(() => {
        getLastPlayedTrack().then(lastTrack => {
            playerStateTracker.addStateChangeHandler(
                (...args) => true,
                (_, state) => {
                    setTrack({
                        id: state.track_id,
                        name: state.track_name,
                        artist: state.artist,
                        imageUrl: state.track_image_url,
                        durationMs: state.duration_ms,
                    });
                    
                    setShuffle(state.shuffle_state);
                    setRepeat(state.repeat_state === 'track');
                    setProgress(Math.round((Number(state.progress_ms) / Number(state.duration_ms)) * 100));
                    setVolume(Number(state.volume_percent) * 100);
                    setPlaying(state.is_playing);
                }
            );

            setTrack({
                id: lastTrack.id,
                name: lastTrack.name,
                artist: lastTrack.artists.map(artist => artist.name).join(', '),
                imageUrl: lastTrack.images[2].url,
                durationMs: lastTrack.duration_ms,
            });
        });
    }, []);

    const handleProgressChange = (value_percent) => {
        value_percent = Number(value_percent);
        seekTo(Math.floor(Number(track.durationMs) * (value_percent / 100)));
        setProgress(value_percent);
    }

    const handleVolumeChange = (volume_percent) => {
        volume_percent = Number(volume_percent);
        apiSetVolume(volume_percent);
        setVolume(volume_percent);
    };

    const handlePlayPause = () => {
        setPlaying(!playing);

        if (playing) {
            pause();
        }
        else {
            playTrack(track.id);
        }
    };

    const handlePlayNext = () => {
        playNext();
    };

    const handlePlayPrev = () => {
        playPrevious();
    };

    const handleRepeat = () => {
        apiSetRepeat(!repeat);
        setRepeat(!repeat);
        
    };

    const handleShuffle = () => {
        apiSetShuffle(!shuffle);
        setShuffle(!shuffle);
    };

    const duration = msToTrackDuration(track.durationMs);

    return (
        <footer>
            <div className="footer__content">
                <div className="player-container" data-track_id="">
                    <button onClick={handlePlayPause} className={`player__icon ${playing ? 'activated' : ''}`}>
                        <svg className="icon">
                            <circle cx="50%" cy="50%" r="13px" />
                        </svg>
                        <svg className="icon-play">
                            <polygon points="0 0, 0 11, 9 5.5" fill="#121212" />
                        </svg>
                        <svg className="icon-pause">
                            <rect x="0" y="0" width="4px" height="11px" />
                            <rect x="7px" y="0" width="4px" height="11px" />
                        </svg>
                    </button>
                    <button onClick={handlePlayPrev} className="player__prev">
                        <svg className="icon">
                            <rect x="0" y="0" width="2" height="11" />
                            <polygon points="2 5.5, 10 11, 10 0" />
                        </svg>
                    </button>
                    <button onClick={handlePlayNext} className="player__next">
                        <svg className="icon">
                            <rect x="9" y="0" width="2" height="11" />
                            <polygon points="0 0, 0 11, 9 5.5" />
                        </svg>
                    </button>
                    <div className="cover-wrap">
                        <img src={track.imageUrl} className="player__cover" />
                    </div>
                    <div className="player__title-container">
                        <div className="audio__title-wrap">
                            <div className="audio__title">
                                <span className="song__title">
                                    {track.name}
                                </span>
                                <span className="song__performer">
                                    {track.artist}
                                </span>
                            </div>
                            <span className="audio__progress-time" data-ms="">{duration}</span>
                        </div>
                        <div className="audio__slider">
                            <ProgressSlider value={progress} handleProgressChange={handleProgressChange} />
                        </div>
                    </div>
                    <div className="player__volume">
                        <VolumeSlider value={volume} handleVolumeChange={handleVolumeChange} />
                    </div>
                    <button onClick={handleShuffle} className={`player__shuffle ${shuffle ? 'activated' : ''}`}>
                        <svg className="icon" viewBox="0 0 20 16" width="20px" height="16px">
                            <polygon points="0 0, 20 16" />
                            <polygon points="0 16, 20 0" />

                            <polygon points="20 16, 20 12, 16 16" />
                            <polygon points="20 0, 20 4, 16 0" />
                        </svg>
                    </button>
                    <button onClick={handleRepeat} className={`player__repeat ${repeat ? 'activated' : ''}`}>
                        <svg className="icon" viewBox="0 0 20 16" width="20px" height="16px">
                            <polyline points="3 0, 17 0, 17 6" />
                            <polyline points="3 10, 3 16, 17 16" />

                            <polyline points="14 4, 17 7, 20 4" />
                            <polyline points="0 12, 3 9, 6 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    )
}
