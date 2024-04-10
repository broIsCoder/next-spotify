import SpotifyWebApi from "spotify-web-api-node";

const spotifyScope = [
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-position",
  "user-top-read",
  "playlist-read-private",
  "user-library-read",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-follow-read",
  "app-remote-control",
  "streaming"
];

const signInURL = `https://accounts.spotify.com/authorize?` +
new URLSearchParams({
  response_type: 'code',
  client_id:process.env.SPOTIFY_ID,
  scope: spotifyScope.join(','),
  redirect_uri: process.env.REDIRECT_URI,
}).toString();

export {
  signInURL,
};

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri:  process.env.REDIRECT_URI,
});

export default spotifyApi;