"use client"
import { playlistIdState, playlistState } from '@/recoil/atom/playlistAtom';
import Link from 'next/link'
import React,{useState} from 'react'
import { useRecoilState } from 'recoil';

const PlaylistCard = ({name,images,owner,id}) => {
const [playlistId, setplaylistId] = useRecoilState(playlistIdState);
const [playlist, setplaylist] = useRecoilState(playlistState);

  return (
    <Link href={`/playlist/${id}`} onClick={()=>{setplaylistId(id)}} className='bg-slate-800 min-h-[60px] hover:bg-slate-700 duration-150 p-1 rounded-xl w-full line-clamp-1 flex gap-2 items-center'>
      <div>
        <img src={images[0].url} className='bg-black rounded-xl max-h-[50px] min-h-[50px] max-w-[50px] min-w-[50px]' alt="image" />
      </div>
      <div>
      <div className='line-clamp-1 overflow-hidden text-ellipsis'>{name}</div>
      <small className='line-clamp-1 overflow-hidden text-ellipsis text-slate-400'>{owner.display_name}</small>
      </div>
    </Link>
  )
}

export default PlaylistCard