import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Category from '../components/Main/Category';
import FoundAlbums from '../components/Search/FoundAlbums';
import FoundTracks from '../components/Search/FoundTracks';
import { getNextItems } from '../js/api';
import { TrackFromEntry } from '../js/utils';

import '../styles/pages/search.css';

export default function Search({ setPage }) {
  const [q, setQ] = useState('');

  useEffect(
    () => {
      const query = new URLSearchParams(window.location.search).get('q');
      if (!query) {
        return;
      }

      setPage('search');
      setQ(query);
      console.log(q);
    }, []);

  return (
    <>
      <Category name='Found albums' element={<FoundAlbums q={q} />} />
      <div className="found-tracks">
        <div className="one-line-playlists__tools">
          <h3 className="primary-text">Found tracks</h3>
        </div>
        <div className="found-tracks-container">
          <FoundTracks q={q} />
        </div>
      </div>
    </>
  )
}
