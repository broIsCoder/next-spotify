import Spotify from "next-auth/providers/spotify"
import { signInURL } from "@/lib/spotify"

export const options = {
    providers:[
        Spotify({
            clientId:process.env.SPOTIFY_ID,
            clientSecret:process.env.SPOTIFY_SECRET,
            authorization:signInURL
        })
    ],
    
}