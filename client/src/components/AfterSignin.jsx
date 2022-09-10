import React, { useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import useDevice from '../hooks/useDevice';
import MusicSearch from './MusicSearch';


export default function AfterSignin() {
  const deviceId = useDevice();

  const { accessToken } = useOutletContext();

  return (
    <div className="general-container">
      <MusicSearch />
      <Outlet />
    </div>
  );
}
