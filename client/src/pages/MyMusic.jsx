import React, { useState, useEffect } from 'react';
import TracksContainer from '../components/Main/TracksContainer.jsx';
import { checkForSavedTracks, getUsersAudios } from '../js/api.js';

import '../styles/pages/my_music.css';


export default function MyMusic({ setPage }) {
    useEffect(
        () => {
            setPage('my_music');
        }, []);

    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        getUsersAudios().then(res => {
            checkForSavedTracks(res.map(track => track.id)).then(added => {
                const tracksCopy = [];

                res.forEach((track, i) => {
                    tracksCopy.push({
                        ...track,
                        added: added[i],
                        next: false,
                    });
                });

                setTracks([...tracksCopy]);
            });
        });
    }, []);

    return (
        <div className="tracks-container">
            <div className="multi-line-tracks">
                <TracksContainer tracks={tracks} setTracks={setTracks} />
            </div>
        </div>
    )
}
