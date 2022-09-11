import React from 'react'
import { Outlet } from 'react-router-dom';
import MusicSearch from './MusicSearch';

export default function Main() {
    return (
        <div className="general-container">
            <MusicSearch />
            <Outlet />
        </div>
    );
}
