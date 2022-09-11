import React from 'react'

export default function ProgressSlider({value, handleProgressChange}) {
  const handleInput = (e)=>{
    handleProgressChange(e.target.value);
  };

  return (
    <input onChange={handleInput} className="slider progress" type="range" value={value} style={{backgroundSize: `${value}% 100%`}} min="0" max="100" />
  )
}
