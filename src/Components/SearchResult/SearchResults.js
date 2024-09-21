import React from 'react';
import { Tracklist } from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';

export default function SearchResults({ tracks, addTrack }) {
    return (
        <>
            <div className={styles.divContent}>
                <h1 className={styles.h1Result}>Search Results</h1>
                <Tracklist
                    tracks={tracks}
                    addTrack={addTrack}
                    isRemoval={false}
                />
            </div>
        </>
    )
}