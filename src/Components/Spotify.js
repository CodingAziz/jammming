const client_id = '1a249c48f3934b22bbb5c684892be093';
const scope = 'playlist-modify-public playlist-modify-private';
const redirect_uri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/search?q=${term}&type=track`;
        const headers = { Authorization: `Bearer ${accessToken}`};
        return fetch(endpoint, {
            method: 'GET',
            headers: headers,
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                } else {
                    return jsonResponse.tracks.items.map((track) => {
                        return {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri
                        }
                    })
                }
            })
            .catch(error => console.log(error));
    },

    savePlaylist(name, trackUri) {
        const accessToken = Spotify.getAccessToken();
        const endpoint_user = `https://api.spotify.com/v1/me`;
        const headers = { Authorization: `Bearer ${accessToken}`};
        return fetch(endpoint_user, {
            headers: headers,
        })
            .then(response => response.json())
            .then(jsonResponse => {
                const user_id = jsonResponse.id;
                const endpoint_playlist = `https://api.spotify.com/v1/users/${user_id}/playlists`
                return fetch(endpoint_playlist, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({name: name}),
                })
                    .then(response => response.json())
                    .then(jsonResponse => {
                        const playlist_id = jsonResponse.id;
                        const endpoint_add_playlist = `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`;
                        return fetch(endpoint_add_playlist, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({uris: trackUri}),
                        })
                    })
            })
    }
}


export default Spotify;