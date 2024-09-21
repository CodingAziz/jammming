import React from 'react';
import { Track } from '../Track/Track';

export function Tracklist({ tracks, addTrack, removeTrack, isRemoval }) {

    return (
        <>
            {tracks.map((track) => {
                return (
                    <Track
                        key={track.id}
                        track={track}
                        onAdd={addTrack}
                        onRemove={removeTrack}
                        isRemoval={isRemoval}
                    />
                )
            })}
        </>
    )
}