import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver';
import { getItems } from '../../js/api';
import { AlbumFromEntry } from '../../js/utils';
import AlbumsContainer from '../Main/AlbumContainer';

export default function FoundAlbums({ q }) {
    const [albums, setAlbums] = useState([]);
    const lastElement = useRef();

    const market = sessionStorage.getItem('country');
    const nextAlbums = 'nextAlbums';

    const loadAlbums = async (url) => {
        if (!url || url === String(undefined)) {
            return;
        }

        const { items, next } = await getItems({
            url,
            extractItemFromEntry: AlbumFromEntry,
            attr: 'albums',
            predicate: album => album.album_type === 'album',
        });

        if (items.length === 0) {
            return;
        }

        console.log({items});
        setAlbums([...albums, ...items]);
        sessionStorage.setItem(nextAlbums, next);
    };

    const [fetchAlbums, isTracksLoading, trackError] = useFetching(loadAlbums);

    useObserver(lastElement, true, isTracksLoading, () => {
        fetchAlbums(sessionStorage.getItem(nextAlbums));
    });

    useEffect(
        () => {
            sessionStorage.setItem(
                nextAlbums,
                `https://api.spotify.com/v1/search?q=${q}&type=album&include_external=audio&offset=0&limit=50${market ? `&market=${market}` : ''}`,
            );
        }, [q]);

    return (
        <>
            <AlbumsContainer albums={albums} />
            <div ref={lastElement} style={{ backgroundColor: '#FFF', height: '1px', width: '1px' }}></div>
        </>
    )
}
