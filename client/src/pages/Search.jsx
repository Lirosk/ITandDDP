import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import FoundAlbums from '../components/Search/FoundAlbums';
import FoundTracks from '../components/Search/FoundTracks';
import { getNextItems } from '../js/api';
import { TrackFromEntry } from '../js/utils';

import '../styles/pages/search.css';

export default function Search({ setPage }) {
  const [q, setQ] = useState(new URLSearchParams(window.location.search).get('q'));
  window.history.pushState({}, null, '/search');

  useEffect(
    () => {
      setPage('search');
    }, []);

  const expandBtnStates = ['Expand', 'Collapse'];
  const [expandBtnState, setExpandBtnState] = useState(0);

  const handleExpand = () => {
    setExpandBtnState(expandBtnState ^ 1);
  };

  return (
    <>
      <div className="one-line-playlists">
        <div className="one-line-playlists__tools">
          <h3 className="primary-text">Found playlists</h3>
          <button onClick={handleExpand} className={`ref-text expand-btn ${expandBtnState ? '' : 'expanded'}`}>{expandBtnStates[expandBtnState]}</button>
        </div>
        <FoundAlbums q={q} />
      </div>
      <div className="found-tracks">
        <div className="one-line-playlists__tools">
          <h3 className="primary-text">Found tracks</h3>
        </div>
        <FoundTracks q={q} />
      </div>
    </>
  )
}
