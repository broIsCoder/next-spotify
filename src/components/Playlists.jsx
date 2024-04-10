"use client"
import React, { useEffect, useState } from 'react'
import PlaylistCard from './PlaylistCard'
import { useSession } from 'next-auth/react';
import SkeletonLoader from './SkeletonLoader';
import useSpotify from '@/hooks/useSpotify';

const Playlists = () => {
  const { data: session, status } = useSession();
  const [playlists, setplaylists] = useState([]);
  const [loading, setloading] = useState(true);
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && session) {
      spotifyApi.getUserPlaylists().then((data) => {
        setplaylists(data.body.items);
        setloading(false)
      })
    }
  }, [session, spotifyApi])

  return (
    <div className='flex flex-col gap-1 mb-24 w-full overflow-x-hidden scroll-smooth overflow-y-auto'>
      {playlists.length > 0 && playlists.map((playlist,i) => (
        <PlaylistCard key={i} {...playlist} />
      ))}
      {
        !loading && playlists.length === 0 &&
        <div className='font-extrabold'>Add Your Playlists</div>
      }
      {
        loading &&
        [1, 2, 3, 4, 5, 6, 7].map((skeleton) => (
          <SkeletonLoader key={skeleton} Class={"rounded-xl"} />
        ))
      }
    </div>
  )
}

export default Playlists