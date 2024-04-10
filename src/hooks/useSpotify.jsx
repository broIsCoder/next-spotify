"use client"
import spotifyApi from '@/lib/spotify'
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const useSpotify = () => {
    const { data: session } = useSession();
    useEffect(() => {
        if (session) {
            if (session?.error === "RefreshAccessTokenError") {
                //if refreshing token fails , navigate programtically to sign in page
                signIn();
            }
            // if token is good to go , set the token for spotify api as well
            spotifyApi.setAccessToken(session?.user.accessToken);
        }
    }, [session])

    return spotifyApi
}

export default useSpotify
