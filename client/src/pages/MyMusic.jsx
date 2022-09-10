import React, { useState, useEffect } from 'react';
import MusicSearch from '../components/MusicSearch.jsx';
import TrackContainer from '../components/TrackContainer.jsx';
import { checkForSavedTracks } from '../js/api.js';

import { getTracks } from '../js/controllers/my_music.js';

import '../styles/pages/my_music.css';

export default function MyMusic() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        getTracks().then(res => {
            console.log({
                tracks,
                res
            });

            checkForSavedTracks(res.map(track => track.id)).then((added => {
                for (const i in res) {
                    const track = res[i];
                    track.added = added[i];
                    track.next = false;
                }

                setTracks([...res]);
            }));
        });
    }, []);

    return (
        <div className="general-container">
            <div className="tracks-container">
                <MusicSearch />
                <div className="multi-line-tracks">
                    {tracks.map(track => {
                        // const track = obj.track;
                        // const setTrack = obj.setTrack;
                        return (
                            <TrackContainer key={track.id} track={track} />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
