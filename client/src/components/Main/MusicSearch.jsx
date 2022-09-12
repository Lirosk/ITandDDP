import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { isStringInvalid } from '../../js/utils';

export default function MusicSearch({ page }) {
    const navigate = useNavigate();
    const qRef = useRef();

    const handleSearch = () => {
        const q = qRef.current.value;
        qRef.current.value = '';

        if (isStringInvalid(q)) {
            alert('stop it get some help');
            return;
        }

        if (page === 'search' || window.location.pathname.includes('search')) {
            window.location.search = `q=${q}`;
        }
        else {
            navigate(`/search?q=${encodeURI(q)}`);
        }
    };

    return (
        <form className="music-search">
            <div className="search-wrap">
                <input ref={qRef} className="music-search__input" type="text" placeholder="Search music" required />
                <button onClick={handleSearch} className="music-search__button" type="button">
                    <img className="icon" src="./img/search.png" />
                </button>
            </div>
        </form>
    )
}
