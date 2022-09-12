import React, { useEffect, useState } from 'react';
import { getAvailableDevice } from '../js/api';

export default function useDevice(signedIn) {
    const [deviceId, setDeviceId] = useState(0);

    useEffect(() => {
        if (!signedIn) {
            return;
        }

        getAvailableDevice().then(res => {
            if (!res) {
                return;
            }

            setDeviceId(res.id);
            sessionStorage.setItem('available_device', res.id);
        }).catch((error) =>{
            console.log(error);
        })
    }, [signedIn]);
}
