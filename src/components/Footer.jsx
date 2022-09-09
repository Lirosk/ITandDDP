import React from 'react'

import "../styles/components/footer.css";

export function Footer() {
    return (
        <footer>
            <div className="footer__content">
                <div className="player-container" data-track_id="">
                    <button className="player__icon">
                        <svg className="icon">
                            <circle cx="50%" cy="50%" r="13px" />
                        </svg>
                        <svg className="icon-play">
                            <polygon points="0 0, 0 11, 9 5.5" fill="#121212" />
                        </svg>
                        <svg className="icon-pause">
                            <rect x="0" y="0" width="4px" height="11px" />
                            <rect x="7px" y="0" width="4px" height="11px" />
                        </svg>
                    </button>
                    <button className="player__prev">
                        <svg className="icon">
                            <rect x="0" y="0" width="2" height="11" />
                            <polygon points="2 5.5, 10 11, 10 0" />
                        </svg>
                    </button>
                    <button className="player__next">
                        <svg className="icon">
                            <rect x="9" y="0" width="2" height="11" />
                            <polygon points="0 0, 0 11, 9 5.5" />
                        </svg>
                    </button>
                    <div className="cover-wrap">
                        <img src="../img/album_cover.png" className="player__cover" />
                    </div>
                    <div className="player__title-container">
                        <div className="audio__title-wrap">
                            <div className="audio__title">
                                <span className="song__title">
                                    Listened Author
                                </span>
                                <span className="song__performer">
                                    Listened Performer
                                </span>
                            </div>
                            <span className="audio__progress-time" data-ms="">mm:ss</span>
                        </div>
                        <div className="audio__slider">
                            <input className="slider progress" type="range" value="0" min="0" max="100" />
                        </div>
                    </div>
                    <div className="player__volume">
                        <input className="slider volume" type="range" value="0" min="0" max="100" />
                    </div>
                    <button className="player__shuffle">
                        <svg className="icon" viewBox="0 0 20 16" width="20px" height="16px">
                            <polygon points="0 0, 20 16" />
                            <polygon points="0 16, 20 0" />

                            <polygon points="20 16, 20 12, 16 16" />
                            <polygon points="20 0, 20 4, 16 0" />
                        </svg>
                    </button>
                    <button className="player__repeat">
                        <svg className="icon" viewBox="0 0 20 16" width="20px" height="16px">
                            <polyline points="3 0, 17 0, 17 6" />
                            <polyline points="3 10, 3 16, 17 16" />

                            <polyline points="14 4, 17 7, 20 4" />
                            <polyline points="0 12, 3 9, 6 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    )
}
