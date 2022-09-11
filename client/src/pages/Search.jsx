import React, { useEffect } from 'react'

export default function Search({ setPage }) {
  useEffect(
    () => {
      setPage('search');
    }, []);

  return (
    <h1>Search</h1>
  )
}
