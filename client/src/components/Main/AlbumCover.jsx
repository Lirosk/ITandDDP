import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { pause, playAlbum } from '../../js/api';

export default function AlbumCover({ album, playing }) {
    const performer = album.artists.map(artist => artist.name).join(', ');
    const image = album.images[1] ? album.images[1] : album.images[0];

    const handlePlayAlbum = ()=>{
        if (playing) {
            pause();
        }
        else {
            playAlbum(album.id);
        }
    };

    const handleShowPopup = ()=>{
        // TODO
    };

    return (
        <div className="cover-container">
            <div className="album__cover">
                <button className="button-icon">
                    <img className="icon" src={image.url} alt={album.name} />
                </button>
                <div className="play-pause-button-wrap">
                    <button onClick={handlePlayAlbum} className={`play-pause-button ${playing ? 'activated' : ''}`}></button>
                </div>
            </div>
            <span className="album__title">{album.name}</span>
            <Link className="album__performer" to={`search?q=${encodeURIComponent(performer)}`}>{performer}</Link>
            <span className="album__release-date">{album.releaseDate}</span>
        </div>
    )
}
