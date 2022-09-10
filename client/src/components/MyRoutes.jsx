import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { General } from '../pages/General'
import MyMusic from '../pages/MyMusic';
import MyPlaylists from '../pages/MyPlaylists';
import Search from '../pages/Search';
import AfterSignin from './AfterSignin';
import RequireSignin from './RequireSignin';


export function MyRoutes({ setSignedIn }) {
    return (
        <Routes>
            <Route element={<RequireSignin setSignedIn={setSignedIn} />} >
                <Route element={<AfterSignin />}>
                    <Route path='/general' element={<General />} />
                    <Route path='/my_music' element={<MyMusic />} />
                    <Route path='/my_playlists' element={<MyPlaylists />} />
                    <Route path='/search' element={<Search />} />
                </Route>
            </Route>
            <Route path='*' element={<Navigate to='/general' reset />} />
        </Routes >
    );
}
