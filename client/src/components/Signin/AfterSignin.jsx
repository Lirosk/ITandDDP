import React from 'react';
import useDevice from '../../hooks/useDevice';
import Main from '../Main/Main';


export default function AfterSignin() {
  const deviceId = useDevice();

  return (
    <Main />
  );
}
