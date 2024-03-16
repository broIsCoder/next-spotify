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
];

const signInURL = `https://accounts.spotify.com/authorize?` +
new URLSearchParams({
  response_type: 'code',
  client_id:spotifyClientId,
  scope: spotifyScope.join(','),
  redirect_uri: spotifyRedirectUrl,
}).toString();

export {
  spotifyClientId,
  spotifyClientSecretKey,
  spotifyRedirectUrl,
  spotifyScope,
  jwtSecretSign,
  signInURL,
};

const spotifyApi = new SpotifyWebApi({
  clientId: spotifyClientId,
  clientSecret: spotifyClientSecretKey,
  redirectUri: spotifyRedirectUrl,
});

export default spotifyApi;