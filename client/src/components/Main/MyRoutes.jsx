import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { playerStateTracker } from '../../js/controllers/player_state_tracker';
import { General } from '../../pages/General';
import MyMusic from '../../pages/MyMusic';
import MyPlaylists from '../../pages/MyPlaylists';
import Search from '../../pages/Search';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import AfterSignin from '../Signin/AfterSignin';
import RequireSignin from '../Signin/RequireSignin';


export function MyRoutes() {
    const [signedIn, setSignedIn] = useState(false);
    const [page, setPage] = useState('/');

    const logoutHandler = () =>{
        sessionStorage.clear();
        playerStateTracker.clearHandlers();
        setSignedIn(false);
    }

    return (
        <>
            <Header signedIn={signedIn} logoutHandler={logoutHandler} page={page} />
            <main>
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

            </main>
            <Footer signedIn={signedIn} />
        </>
    );
}
