import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import AlbumsContainer from '../components/Main/AlbumContainer';
import { getUsersAlbums } from '../js/api';

import '../styles/pages/my_playlists.css';

export default function MyPlaylists({ setPage, setPopupState }) {
  useEffect(
    () => {
      setPage('my_playlists');
    }, []);

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getUsersAlbums().then(savedAlbums => {
      setAlbums(savedAlbums);
    });
  }, []);

  return (
    <div className="playlists-container">
      <div className="multi-line-playlists">
        <AlbumsContainer isPlaylists={false} setPopupState={setPopupState} albums={albums} />
      </div>
    </div>
  )
}
