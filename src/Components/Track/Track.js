import React from 'react';
import styles from './Track.module.css';

export function Track({ track, onAdd, onRemove, isRemoval }) {

    const addTrack = () => {
        onAdd(track);
    }

    const removeTrack = () => {
        onRemove(track);
    }

    const button = () => {
        if (!isRemoval) {
            return (
                <button
                    onClick={addTrack}
                    className={styles.addBtn}
                >+</button>
            )
        } else {
            return (
                <button
                    onClick={removeTrack}
                    className={styles.removeBtn}
                >-</button>
            )
        }
    }

    return (
        <>
            <div key={track.id} className={styles.innerLayer}>
                <h2>{track.name}</h2>
                <p className={styles.para}>{track.artist} | {track.album}</p>
            </div>
            <div>
                {button()}
            </div>
        </>
    )
}