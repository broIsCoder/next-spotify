"use client"
import spotifyApi from '@/lib/spotify';
import { formatDuration } from '@/lib/utilities';
import { currentTrackIdState, currentTrackTypeState, isCurrentTrackPlayingState } from '@/recoil/atom/trackAtom';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { FaBackward, FaForward, FaPause, FaPlay, FaVolumeDown, FaVolumeUp } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';

const Player = () => {
  const { data: session, status } = useSession();
  const [currentTrackData, setCurrentTrackData] = useState(null);
  const [currentTrackId, setcurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setisPlaying] = useRecoilState(isCurrentTrackPlayingState);
  const currentTrackType = useRecoilValue(currentTrackTypeState);
  const [volume, setvolume] = useState(50);

  function handlePlayPauseTrack() {
    setisPlaying((prev) => !prev);
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && session) {
      switch (currentTrackType) {
        case "track":
          spotifyApi.getTrack(currentTrackId).then(data => {
            setCurrentTrackData(data.body)
          })
          break;

        case "episode":
          spotifyApi.getEpisode(currentTrackId).then(data => {
            setCurrentTrackData(data.body);
          })
          break;

        default:
          break;
      }
    }
  }, [currentTrackId, spotifyApi])

  useEffect(() => {


  }, [])

  if (currentTrackId) {

    return (
      <div className={`h-full w-full flex-col justify-between bg-black rounded-md  p-1`}>

        <div className='w-full flex gap-2'>
          <div className='w-full h-[50px] flex justify-start items-center gap-2'>
            {currentTrackId !== null &&
              <>
                <img src={currentTrackData?.album?.images[0]?.url || currentTrackData?.images[0].url || ""} alt="loading..." className={` ${isPlaying ? "animate-[spin_8s_linear_infinite]" : ""} rounded-full max-h-[50px] min-w-[50px] min-h-[50px] max-w-[50px] bg-black`} />
                <div className=''>
                  <h1 className='line-clamp-1 font-bold text-gray-300'>{currentTrackData?.name}</h1>
                  <div className='flex space-x-2'>
                    {
                      currentTrackData?.artists?.map((artist, i) => {
                        return <small key={i} className='line-clamp-1 font-bold text-gray-300 underline'>{artist.name}</small>
                      })
                    }

                  </div>
                </div>
              </>
            }
          </div>
          <div className='flex gap-2 sm:w-full justify-center items-center'>
            <button className='p-2 text-sm  text-gray-400 hover:text-white rounded-full'>
              {FaBackward()}
            </button>
            <button onClick={handlePlayPauseTrack} className='p-2 text-sm text-black bg-white transition-all rounded-full hover:scale-125'>
              {isPlaying ? FaPause() : FaPlay()}
            </button>
            <button className='p-2 text-sm text-gray-400 hover:text-white rounded-full'>
              {FaForward()}
            </button>

          </div>
          <div className='w-full gap-2  justify-end sm:p-2  items-center hidden sm:flex'>
            {FaVolumeUp()}
            <input type="range" name="" id="" className='' />
          </div>
        </div>
        <div className='flex gap-1 justify-center py-1'>
          <span className='text-xs'>00:00</span>
          <input type="range" name="" id="" className='w-full sm:w-4/6 md:w-2/5' />
          <span className='text-xs'>{currentTrackData?.duration_ms === null ? "00:00" : formatDuration(currentTrackData?.duration_ms)}</span>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default Player
