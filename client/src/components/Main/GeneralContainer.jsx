import React from 'react'
import { Outlet } from 'react-router-dom';
import MusicSearch from './MusicSearch';

export default function GeneralContainer({ page }) {
    return (
        <div className="general-container">
            <MusicSearch page={page} />
            <Outlet />
        </div>
    );
}
