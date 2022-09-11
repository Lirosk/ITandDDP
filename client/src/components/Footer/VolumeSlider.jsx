import React from 'react'

export default function VolumeSlider({ value, handleVolumeChange }) {
  const handleInput = (e) => {
    handleVolumeChange(e.target.value);
  }

  return (
    <input onChange={handleInput} className="slider volume" type="range" value={value} style={{ backgroundSize: `${value}% 100%` }} min="0" max="100" />
  )
}
