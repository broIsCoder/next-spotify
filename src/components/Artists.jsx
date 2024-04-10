"use client"
import React, { useState, useEffect } from 'react'
import ArtistCard from './ArtistCard'
import { useSession } from 'next-auth/react';
import SkeletonLoader from './SkeletonLoader';
import useSpotify from '@/hooks/useSpotify';

const Artists = () => {
    const { data: session, status } = useSession();
    const spotifyApi = useSpotify();
    const [artists, setartists] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getFollowedArtists().then((data) => {
                setartists(data.body.artists.items);
                setloading(false);
            })
        }
    }, [session, spotifyApi])

    return (
        <div className='flex flex-col gap-1 mb-24 h-full w-full overflow-x-hidden scroll-smooth overflow-y-auto'>

            {artists.length > 0 &&
                artists.map((artist) => (
                    <ArtistCard key={artist.id} {...artist} />
                ))
            }
            {
                !loading && artists.length === 0 &&
                <div className='font-extrabold'>Add Your Artists</div>
            }
            {
                loading &&
                [1, 2, 3, 4, 5, 6, 7].map((skeleton) => (
                    <SkeletonLoader key={skeleton} Class={"rounded-full"} />
                ))
            }
        </div>
    )
}

export default Artists