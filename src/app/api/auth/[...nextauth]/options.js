import Spotify from "next-auth/providers/spotify"
import spotifyApi, { signInURL } from "@/lib/spotify"

// https://accounts.spotify.com/authorize?response_type=code&client_id=319cb91ecf0f4314ba3212924959072e&scope=user-read-email,user-read-private,user-read-playback-state,user-modify-playback-state,user-read-currently-playing,user-read-recently-played,user-read-playback-position,user-top-read,playlist-read-private,user-library-read,user-read-playback-state,user-read-currently-playing&redirect_uri=http://localhost:3000/api/auth/callback/spotify

async function refrehsAcessToken(token){
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const {body:refreshedToken} = await spotifyApi.refreshAccessToken();
        console.log("Refreshed Token is ",refreshedToken);
        
        return {
            ...token,
            accessToken:refreshedToken.access_token,
            accessTokenExpires:Date.now() + refreshedToken.expires_in * 1000,     // will expires in 1 hour from now   // presentTime + 3600*1000
            refreshToken:refreshedToken.refresh_token ?? token.refreshToken,     // replace with new one else fall back to old one
        }
    } catch (error) {
        console.error(error);
        return{
            ...token,
            error:"RefreshAccessTokenError"
        }
    } 
}

export const options = {
    providers:[
        Spotify({
            clientId:process.env.SPOTIFY_ID,
            clientSecret:process.env.SPOTIFY_SECRET,
            authorization:signInURL
        })
    ],
    secret:process.env.JWT_SECRET,
    callbacks:{
        async jwt({token,account,user}){
            console.log("Token : ",token);
            console.log("Account : ",account);
            console.log("User : ",user);

            // if first signIn of user
            if(account && user){
                return {
                    ...token,
                    accessToken:account.access_token,
                    refreshToken:account.refresh_token,
                    username:account.providerAccountId,
                    accessTokenExpires:account.expires_at * 1000   // in milliseconds 3600*1000 = 3600000 millisec
                }
            }

            // Return previous token , if access token is not expired yet
            if(Date.now()< token.accessTokenExpires){
                console.log("Existing Token is still valid")
                return token ;
            }
            
            // Refresh accesss token , if previous token expires
                console.log("Existing Token is has expired !!!")
                return await refrehsAcessToken(token);
        },

        async session({session,token}){
            console.log("Token : ",token);
            console.log("Session Callback Function  : ",session);
            session.user.accessToken = token.accessToken ;
            session.user.refreshToken = token.refreshToken ;
            session.user.username = token.username ;

            return session ;
        }
    }
}