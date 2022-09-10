import React, { useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import useDevice from '../hooks/useDevice';


export default function AfterSignin() {
  const deviceId = useDevice();

  const { accessToken } = useOutletContext();

  return (
    <Outlet />
  );
}
