"use client"
import React, { useEffect } from 'react'
import { formatDuration } from '@/lib/utilities'
import { currentEpisodeIdState } from '@/recoil/atom/episodeAtom'
import { useRecoilState } from 'recoil'
import { isCurrentTrackPlayingState } from '@/recoil/atom/trackAtom'

const Episode = ({ episode, number }) => {
    const [currentEpisodeId, setcurrentEpisodeId] = useRecoilState(currentEpisodeIdState);
    const [isCurrentTrackPlaying, setisCurrentTrackPlaying] = useRecoilState(isCurrentTrackPlayingState);

    function togglePlayPause() {
        setcurrentEpisodeId(episode.id);
        if (episode.id === currentEpisodeId) {
            setisCurrentTrackPlaying((prev) => !prev);
        } else {
            setisCurrentTrackPlaying(true);
        }
        // try {
        //     spotifyApi.play({
        //         uris: [episode.uri],
        //     })
        // } catch (error) {
        //     console.log("This Feauture requires premium subscription of spotify :(")
        // }
    }

    return (
        <button onClick={togglePlayPause} className='p-1 hover:bg-gradient-to-r hover:from-transparent hover:via-gray-700 hover:to-transparent w-full items-center justify-between rounded-md flex gap-1'>
            <div className=' flex gap-2 items-center w-full lg:w-4/6 overflow-hidden'>
                {number &&
                    <div className='sm:flex text-gray-300 min-w-[50px] max-w-[70px] hidden items-center justify-center rounded-md'>
                        {number}
                    </div>
                }
                <div className='flex justify-start items-center'>
                    <img src={episode?.album.images[0].url || ""} className='max-h-[60px] min-w-[60px] min-h-[60px] max-w-[60px] rounded-md' alt="loading" />
                </div>
                <div className='w-full text-start'>
                    <h1 className='line-clamp-1 font-semibold'>{episode.name} </h1>
                    <span className='line-clamp-1'>
                        {episode.artists.map((artist) => (
                            <small key={artist.id} className='text-gray-300 font-extrabold'>{artist.name}, </small>
                        ))}
                    </span>
                </div>
            </div>
            <div className='text-gray-300 text-start lg:block hidden font-semibold w-3/6'>
                <div className='line-clamp-1'>
                    {episode.album.name}
                </div>
            </div>
            <div className='p-2 line-clamp-1 w-[100px] text-center'>{formatDuration(episode.duration_ms)}</div>
        </button>
    )
}

export default Episode