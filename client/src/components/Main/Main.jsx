import React, { useState } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { playerStateTracker } from '../../js/controllers/player_state_tracker';
import { General } from '../../pages/General';
import MyMusic from '../../pages/MyMusic';
import MyPlaylists from '../../pages/MyPlaylists';
import Search from '../../pages/Search';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import RequireSignin from '../Signin/RequireSignin';
import GeneralContainer from './GeneralContainer';


export function Main() {
    const [signedIn, setSignedIn] = useState(false);
    const [page, setPage] = useState('/');
    const [q, setQ] = useState('');

    const logoutHandler = () => {
        sessionStorage.clear();
        playerStateTracker.clearHandlers();
        setSignedIn(false);
    }

    return (
        <BrowserRouter>
            <Header signedIn={signedIn} logoutHandler={logoutHandler} page={page} />
            <main>
                <Routes>
                    <Route element={<RequireSignin setSignedIn={setSignedIn} />} >
                        <Route element={<GeneralContainer page={page} />}>
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
        </BrowserRouter>
    );
}
