import React from 'react'

export default function MusicSearch() {
    return (
        <form className="music-search">
            <div className="search-wrap">
                <input className="music-search__input" type="text" placeholder="Search music" required />
                <button className="music-search__button" type="button">
                    <img className="icon" src="./img/search.png" />
                </button>
            </div>
        </form>
    )
}
