import React, { useEffect, useRef, useState } from 'react';
import AlbumsContainer from '../components/Main/AlbumContainer';
import Category from '../components/Main/Category';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { getCategories, getCathegory, getItems, getRecomendations } from '../js/api';

import '../styles/pages/general.css'

export function General({ setPage }) {
    const [categories, setCategories] = useState([]);
    const lastElement = useRef();

    const market = sessionStorage.getItem('country');
    const nextCategory = 'nextCategory';

    const loadCategory = async (url) => {
        if (!url || url === String(undefined)) {
            return;
        }

        const { category, next } = await getCathegory(url);

        setCategories([...categories, category]);
        sessionStorage.setItem(nextCategory, next);
    };

    const [fetchCategory, isLoading, error] = useFetching(loadCategory);

    useObserver(lastElement, true, isLoading, () => {
        fetchCategory(sessionStorage.getItem(nextCategory));
    });

    useEffect(
        () => {
            setPage('general');
            sessionStorage.setItem(
                nextCategory,
                `https://api.spotify.com/v1/browse/categories?offset=0&limit=1${market ? `&country=${market}` : ''}`,
            )
        }, []);

    return (
        <>
            {categories.map(category => {
                return <Category name={category.name} element={<AlbumsContainer albums={category.playlists} />} />
            })}
            <div ref={lastElement} style={{ height: '1px', border: 'none', backgroundColor: 'transparent' }}></div>
        </>
    );
}
