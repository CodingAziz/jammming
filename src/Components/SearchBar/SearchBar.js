import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ searchQuery, handleSearchQuery, onSearch }) {
    const handleChange = (e) => {
        searchQuery = e.target.value;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    }

    return (
        <div className={styles.searchDiv}>
            <input
                type="text"
                name="search"
                className={styles.searchBar}
                placeholder="Search..."
                onChange={handleChange}
            />
            <button
                className={styles.searchBtn}
                onClick={handleSubmit}
            >
                Search
            </button>
        </div>
    )
}