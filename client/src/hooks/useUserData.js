import React, { useEffect } from 'react'
import { getUserData } from '../js/api';

export default function useUserData(signedIn) {
  useEffect(()=>{
    if (!signedIn) {
        return;
    }
    
    getUserData();
  }, [signedIn]);
}
