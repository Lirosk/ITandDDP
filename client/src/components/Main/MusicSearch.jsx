import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MusicSearch() {
    const navigate = useNavigate();
    const q = useRef();

    const handleSearch = () => {
        navigate(`/search?q=${q.current.value}`);
        q.current.value = '';
    };

    return (
        <form className="music-search">
            <div className="search-wrap">
                <input ref={q} className="music-search__input" type="text" placeholder="Search music" required />
                <button onClick={handleSearch} className="music-search__button" type="button">
                    <img className="icon" src="./img/search.png" />
                </button>
            </div>
        </form>
    )
}
