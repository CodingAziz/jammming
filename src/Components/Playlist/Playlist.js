import React, { useCallback } from 'react';
import styles from './Playlist.module.css';
import {Tracklist} from "../Tracklist/Tracklist";

export default function Playlist({ tracks, playlistName, setPlaylistName, removeTrack, onSave}) {
    const handleChange = (e) => {
        setPlaylistName(e.target.value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.divStyles}>
                <input
                    className={styles.input}
                    type="text"
                    name="playlistName"
                    value={playlistName}
                    onChange={handleChange}
                />
                <hr/>
            </div>
            <div>
                <Tracklist
                    tracks={tracks}
                    removeTrack={removeTrack}
                    isRemoval={true}
                />
            </div>
            <button
                className={styles.btn}
                onClick={onSave}
            >
                Save To Spotify
            </button>
        </div>
    )
}