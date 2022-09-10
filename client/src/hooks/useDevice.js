import React, { useEffect, useState } from 'react';
import { getAvailableDevice } from '../js/api';

export default function useDevice() {
    const [deviceId, setDeviceId] = useState(0);

    useEffect(() => {
        getAvailableDevice().then(res => {
            if (!res) {
                return;
            }

            setDeviceId(res.id);
            localStorage.setItem('available_device', res.id);
        }).catch((error) =>{
            console.log(error);
        })
    }, [deviceId]);

    return deviceId;
}
