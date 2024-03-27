'use client'
import spotifyApi from '@/lib/spotify';
import { useSession } from 'next-auth/react';
import { FaClock, FaDotCircle, FaEllipsisH, FaPlay, FaPlus, FaPlusCircle } from 'react-icons/fa';
import React, { useEffect, useState, useRef } from 'react'
import Track from '@/components/Track';
import { cleanUpHtml } from '@/lib/utilities';

const PlaylistPage = ({ params }) => {

  const { data: session, status } = useSession();
  const [playlist, setplaylist] = useState({})
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(false)


  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getPlaylist(params.id).then((data) => {
        setplaylist(data.body);
        setloading(false)
        console.log(data.body);
      }).catch((error) => {
        seterror(error.message)
      })
    }
  }, [spotifyApi, session])



  if (error) {
    return (
      <div className='h-full w-full bg-black flex justify-center items-center'>
        <h1>{error}</h1>
      </div>
    )
  } else {
    if (loading) {
      return (
        <section className='space-y-2'>
          <div className='flex p-3 gap-2 items-end'>
            <div className='rounded-md aspect-square w-1/3 h-1/3 max-w-[180px] max-h-[180px] min-h-[140px] min-w-[140px] bg-gray-800 animate-pulse dark:bg-gray-900'></div>
            <div className='space-y-2 w-full'>
              <div className='bg-gray-800 animate-pulse dark:bg-gray-900 rounded-md p-2 w-1/2'></div>
              <div className='bg-gray-800 animate-pulse dark:bg-gray-900 rounded-md p-4 w-4/4'></div>
              <div className='bg-gray-800 animate-pulse dark:bg-gray-900 rounded-md p-2 w-2/3'></div>
              <div className='bg-gray-800 animate-pulse dark:bg-gray-900 rounded-md p-3 w-1/2'></div>
            </div>
          </div>
          <div className='bg-gray-800 bg-opacity-65 h-fit space-y-2 pt-28 px-6'>
            {[1, 2, 3, 4, 5].map((track) => (
              <div key={track} className='min-h-[70px] bg-gray-600 rounded-md animate-pulse dark:bg-gray-800'></div>
            ))}
          </div>
        </section>
      )
    }
    return (
      <section className='space-y-2'>
        <div className=''>
          <div className='flex flex-col gap-2 p-3'>
            <div className='flex flex-row justify-center items-end h-fit overflow-auto gap-2'>
              <img src={playlist?.images[0].url} className='rounded-md aspect-square w-1/3 h-1/3 max-w-[180px] max-h-[180px] min-h-[140px] min-w-[140px]' alt="playlist_img" />
              <div className='h-full w-full text-ellipsis overflow-hidden'>
                <small className=''>{playlist?.type}</small>
                <h1 className='text-xl md:text-2xl font-extrabold'>{playlist?.name}</h1>
                <small>{cleanUpHtml(playlist?.description)}</small>
                <div className='flex gap-2 items-center'>
                  <span className='font-extrabold flex-wrap flex'>{playlist?.owner.display_name}</span>
                  <FaDotCircle />
                  <small className='font-semibold'> {playlist?.tracks.total} items</small>
                </div>
              </div>
            </div>
          </div>
          <div className='h-fit bg-opacity-40 bg-gradient-to-b bg-black from-transparent from-0% to-[220px] to-gray-900 p-2'>
            <div className='flex gap-5 px-3 py-2'>
              <button className='p-5 text-xl text-black bg-green-400 rounded-full'>{FaPlay()}</button>
              <button className='text-2xl text-gray-400 rounded-full'>{FaEllipsisH()}</button>
            </div>
            <div className='p-2 h-fit flex flex-col gap-1'>
              <div className='text-gray-400 sticky top-6 items-center rounded-md flex gap-1'>
                <div className='sm:w-4/6 w-full px-14 font-extrabold '>#Title</div>
                <div className='sm:block w-2/6 hidden font-extrabold '>Albums</div>
                <div className='w-8'>{FaClock()}</div>
              </div>
              {playlist?.tracks.items.map((item, i) => {
                return (
                  <Track key={item.track.id} item={item} number={i + 1} />
                )
              })}
            </div>
          </div>
        </div>
        <footer className='p-1 bg-gray-700'>
          footer
        </footer>
      </section>
    )
  }
}

export default PlaylistPage