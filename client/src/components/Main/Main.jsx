import React, { useState } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { playerStateTracker } from '../../js/player_state_tracker';
import { General } from '../../pages/General';
import MyMusic from '../../pages/MyMusic';
import MyPlaylists from '../../pages/MyPlaylists';
import Search from '../../pages/Search';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import RequireSignin from '../Signin/RequireSignin';
import GeneralContainer from './GeneralContainer';
import Popup from '../Popup/Popup';


export function Main() {
    const [signedIn, setSignedIn] = useState(false);
    const [page, setPage] = useState('/');

    const [popupState, setPopupState] = useState({
        id: '',
        isPlaylists: false,
    });

    const logoutHandler = () => {
        sessionStorage.clear();
        playerStateTracker.clearHandlers();
        setSignedIn(false);
    }

    return (
        <BrowserRouter>
            <Header setPopupState={setPopupState} signedIn={signedIn} logoutHandler={logoutHandler} page={page} />
            <main>
                <Routes>
                    <Route element={<RequireSignin signedIn={signedIn} setSignedIn={setSignedIn} />} >
                        <Route element={<GeneralContainer page={page} />}>
                            <Route path='/general' element={<General setPopupState={setPopupState} setPage={setPage} />} />
                            <Route path='/my_music' element={<MyMusic setPage={setPage} />} />
                            <Route path='/my_playlists' element={<MyPlaylists setPopupState={setPopupState} setPage={setPage} />} />
                            <Route path='/search' element={<Search setPopupState={setPopupState} setPage={setPage} />} />
                        </Route>
                    </Route>
                    <Route path='*' element={<Navigate to='/general' reset />} />
                </Routes >
            </main>
            <Popup popupState={popupState} setPopupState={setPopupState} />
            <Footer signedIn={signedIn} />
        </BrowserRouter>
    );
}
