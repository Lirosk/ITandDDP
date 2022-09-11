import React from 'react';
import useDevice from '../../hooks/useDevice';
import { getUserData } from '../../js/api';
import Main from '../Main/Main';


export default function AfterSignin() {
  const deviceId = useDevice();
  getUserData();

  return (
    <Main />
  );
}
