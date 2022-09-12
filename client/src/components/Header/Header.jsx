import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import "../../styles/components/header.css"

export function Header({ setPopupState, signedIn, page, logoutHandler }) {
    const links = [
        {
            path: 'general',
            title: 'General'
        },
        {
            path: 'my_playlists',
            title: 'My playlists',
        },
        {
            path: 'my_music',
            title: 'My music',
        }
    ];

    const hidePopup = () => {
        setPopupState({});
    };

    return (
        <header>
            <div className="header__container">
                <div className="header__refs-container">
                    {signedIn
                        ?
                        <>
                            {links.map(link => {
                                return (
                                    <Link onClick={hidePopup} key={link.path} className={`header__ref ${page === link.path ? 'here-i-am' : ''}`} to={link.path}>
                                        {link.title}
                                    </Link>
                                );
                            })}
                        </>
                        :
                        <>
                            <Link className="header__ref" to="#">
                                About
                            </Link>
                            <Link className="header__ref" to="#">
                                Support
                            </Link>
                        </>
                    }

                </div>
                {signedIn
                    ?
                    <button onClick={logoutHandler} className="header__ref ref-text logout-btn">
                        Log out
                    </button>
                    :
                    ''
                }

            </div>
        </header>
    )
}
