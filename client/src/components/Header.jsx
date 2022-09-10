import React from 'react'
import { Link } from 'react-router-dom'
import { Signin } from '../pages/Signin'

import "../styles/components/header.css"

export function Header({ signedIn }) {
    return (
        <header>
            <div className="header__container">
                <div className="header__refs-container">
                    {signedIn
                        ?
                        <>
                            <Link className="header__ref" to="general">
                                General
                            </Link>
                            <Link className="header__ref" to="my_playlists">
                                My playlists
                            </Link>
                            <Link className="header__ref" to="my_music">
                                My music
                            </Link>
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
                    <Link className="header__ref ref-text logout-btn" to="signin">
                        Log out
                    </Link>
                    :
                    ''
                }

            </div>
        </header>
    )
}
