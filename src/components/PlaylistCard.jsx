"use client"
import { useChangeBgColor } from '@/lib/themes';
import { currentPlaylistIdState, playlistBgColorState } from '@/recoil/atom/playlistAtom';
import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil';

const PlaylistCard = ({ name, images, owner, id }) => {
  const currentPlaylistId = useRecoilValue(currentPlaylistIdState)
  
  return (
    <Link href={`/playlist/${id}`} className={`duration-300 min-h-[60px] ${currentPlaylistId === id ? "bg-green-800" : "hover:bg-slate-700"} duration-150 p-1 rounded-xl w-full line-clamp-1 flex gap-2 items-center`}>
      <div>
        <img src={images[0]?.url} className='bg-black rounded-xl max-h-[50px] min-h-[50px] max-w-[50px] min-w-[50px]' alt="image" />
      </div>
      <div>
        <div className='line-clamp-1 overflow-hidden text-ellipsis'>{name}</div>
        <small className='line-clamp-1 overflow-hidden text-ellipsis text-slate-400'>{owner?.display_name}</small>
      </div>
    </Link>
  )
}

export default PlaylistCard