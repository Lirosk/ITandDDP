import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Category from '../components/Main/Category';
import FoundAlbums from '../components/Search/FoundAlbums';
import FoundTracks from '../components/Search/FoundTracks';
import { isStringInvalid } from '../js/utils';

import '../styles/pages/search.css';

export default function Search({ setPage, setPopupState }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const [foundAlbums, setFoundAlbums] = useState(true);
  const [foundTracks, setFoundTracks] = useState(true);

  useEffect(
    () => {
      const query = new URLSearchParams(window.location.search).get('q');
      if (!query) {
        return;
      }

      if (isStringInvalid(query)) {
        navigate('/general');
      }

      setPage('search');
      setQ(query);
    }, []);

  return (
    <>
      {foundAlbums
        ?
        <Category name='Found albums'>
          <FoundAlbums setFoundAlbums={setFoundAlbums} setPopupState={setPopupState} q={q} />
        </Category>
        :
        <h1 style={{ textAlign: 'center', color: '#FFF8', }}>No albums found</h1>
      }
      {foundTracks
        ?
        <div className="found-tracks">
          <div className="one-line-playlists__tools">
            <h3 className="primary-text">Found tracks</h3>
          </div>
          <div className="found-tracks__row-container">
            <FoundTracks setFoundTracks={setFoundTracks} q={q} />
          </div>
        </div>
        :
        <h1 style={{ textAlign: 'center', color: '#FFF8', }}>No tracks found</h1>
      }
    </>
  )
}