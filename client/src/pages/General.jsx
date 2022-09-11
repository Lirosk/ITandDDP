import React, { useEffect } from 'react';

export function General({ setPage }) {
    useEffect(
        () => {
            setPage('general');
        }, []);

    return (
        <>
            <h1>general</h1>
            <h1>general</h1>
        </>
    );
}
