import React from 'react'
import { Link } from 'react-router-dom'

import "../styles/components/header.css"

export function Header() {
    return (
        <header>
            <div className="header__container">
                <div className="header__refs-container">
                    <Link className="header__ref here-i-am" to="general">
                        General
                    </Link>
                    <Link className="header__ref" to="my_playlists">
                        My playlists
                    </Link>
                    <Link className="header__ref" to="my_music">
                        My music
                    </Link>
                </div>
                <Link className="header__ref ref-text logout-btn" to="signin">
                    Log out
                </Link>
            </div>
        </header>
    )
}
