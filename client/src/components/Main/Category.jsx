import React, { useState } from 'react'

export default function Category({ name, element }) {
    const expandBtnStates = ['Expand', 'Collapse'];
    const [expandBtnState, setExpandBtnState] = useState(0);

    const handleExpand = () => {
        setExpandBtnState(expandBtnState ^ 1);
    };

    return (
        <div className="one-line-playlists">
            <div className="one-line-playlists__tools">
                <h3 className="primary-text">{name}</h3>
                <button onClick={handleExpand} className={`ref-text expand-btn ${expandBtnState ? '' : 'expanded'}`}>{expandBtnStates[expandBtnState]}</button>
            </div>
            <div className={`one-line-playlists__container ${expandBtnState ? 'expanded' : ''}`}>
                {element}
            </div>
        </div>
    )
}
