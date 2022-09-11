import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { General } from '../../pages/General';
import MyMusic from '../../pages/MyMusic';
import MyPlaylists from '../../pages/MyPlaylists';
import Search from '../../pages/Search';
import AfterSignin from '../Signin/AfterSignin';
import RequireSignin from '../Signin/RequireSignin';


export function MyRoutes({ setSignedIn, setPage }) {
        return (
        <Routes>
            <Route element={<RequireSignin setSignedIn={setSignedIn} />} >
                <Route element={<AfterSignin />}>
                    <Route path='/general' element={<General setPage={setPage} />} />
                    <Route path='/my_music' element={<MyMusic setPage={setPage} />} />
                    <Route path='/my_playlists' element={<MyPlaylists setPage={setPage} />} />
                    <Route path='/search' element={<Search setPage={setPage} />} />
                </Route>
            </Route>
            <Route path='*' element={<Navigate to='/general' reset />} />
        </Routes >
    );
}
