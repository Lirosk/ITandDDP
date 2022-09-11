import React from 'react';
import { Outlet } from 'react-router-dom';
import useDevice from '../../hooks/useDevice';
import MusicSearch from '../Main/MusicSearch';


export default function AfterSignin() {
  const deviceId = useDevice();

  return (
    <div className="general-container">
      <MusicSearch />
      <Outlet />
    </div>
  );
}
