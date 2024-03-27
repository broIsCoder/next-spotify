"use client"
import React, { useState, useEffect } from 'react'
import ArtistCard from './ArtistCard'
import { useSession } from 'next-auth/react';
import SkeletonLoader from './SkeletonLoader';
import spotifyApi from '@/lib/spotify';

const Artists = () => {
    const { data: session, status } = useSession();
    const [artists, setartists] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getArtists(['2CIMQHirSU0MQqyYHq0eOx', '57dN52uHvrHOxijzpIgu3E', '1vCWHaC5f2uS3yhpwWbIA6']).then((data) => {
                setartists(data.body.artists);
                setloading(false)
            })
        }
    }, [session, spotifyApi])

    return (
        <div className='flex flex-col gap-1 mb-24 h-full w-full overflow-x-hidden scroll-smooth overflow-y-auto'>

            {artists.length > 0 && artists.map((artist) => (
                <ArtistCard key={artist.id} {...artist} />
            ))}
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