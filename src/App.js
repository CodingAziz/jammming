import React, {useState, useCallback} from 'react';
import Playlist from "./Components/Playlist/Playlist";
import styles from './App.module.css';
import SearchResults from "./Components/SearchResult/SearchResults";
import SearchBar from "./Components/SearchBar/SearchBar";
import Spotify  from './Components/Spotify';

export default function App() {

  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchRequest = useCallback((searchQuery) => {
    setSearchQuery(searchQuery);
    Spotify.search(searchQuery).then(result => setPlaylistTracks(result));
  }, []);

  const addTrack = (track) => {
    if (playlist.some(tracks => tracks.id === track.id)) {}
    else {
      setPlaylist(prev => [...prev, track]);
    }
  }

  const removeTrack = (track) => {
    setPlaylist(prevTrack => prevTrack.filter(tracks => tracks.id !== track.id));
  }

  const handleSavingPlaylist = useCallback(() => {
    const trackUri = playlist.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackUri).then(result => {
      setPlaylistName('New Playlist');
      setPlaylist([]);
    });
  }, [playlist, playlistName]);

  return (
      <div>
        <h1 className={styles.h1}>Ja<span className={styles.span}>mmm</span>ing</h1>
        <div className={styles.container}>
          <div className={styles.searchBarDiv}>
            <SearchBar
                searchQuery={searchQuery}
                onSearch={handleSearchRequest}
            />
          </div>
          <div className={styles.sideBySide}>
            <div className={styles.trackContainer}>
              <SearchResults
                  tracks={playlistTracks}
                  setPlaylistTracks={setPlaylistTracks}
                  addTrack={addTrack}
              />
            </div>
            <Playlist
                tracks={playlist}
                setTracks={setPlaylist}
                playlistName={playlistName}
                setPlaylistName={setPlaylistName}
                removeTrack={removeTrack}
                onSave={handleSavingPlaylist}
            />
          </div>
        </div>
      </div>
  )
}