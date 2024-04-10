"use client"
import React, { lazy, useEffect } from 'react'
import { formatDuration } from '@/lib/utilities'
import { currentTrackIdState, currentTrackTypeState, isCurrentTrackPlayingState } from '@/recoil/atom/trackAtom'
import { useRecoilState } from 'recoil'
import { currentPlaylistIdState } from '@/recoil/atom/playlistAtom'

const Track = ({ track, number, playlistId = null }) => {
    const [currentTrackId, setcurrentTrackId] = useRecoilState(currentTrackIdState);
    const [currentTrackType, setcurrentTrackType] = useRecoilState(currentTrackTypeState);
    const [isCurrentTrackPlaying, setisCurrentTrackPlaying] = useRecoilState(isCurrentTrackPlayingState);
    const [currentPlaylistId, setcurrentPlaylistId] = useRecoilState(currentPlaylistIdState);

    function togglePlayPause() {
        setcurrentTrackId(track.id);
        setcurrentTrackType(track.type);
        if (playlistId) {
            setcurrentPlaylistId(playlistId);
        }
        if (track.id === currentTrackId) {
            setisCurrentTrackPlaying((prev) => !prev);
        } else {
            setisCurrentTrackPlaying(true);
        }
        // try {
        //     spotifyApi.play({
        //         uris: [track.uri],
        //     })
        // } catch (error) {
        //     console.log("This Feauture requires premium subscription of spotify :(")
        // }
    }

    return (
        <button onLoad={lazy} onClick={togglePlayPause} className={`p-1 ${currentTrackId === track.id ? "bg-green-900 bg-opacity-25": "hover:bg-gradient-to-r hover:from-transparent hover:via-gray-700 hover:to-transparent"}} w-full items-center justify-between rounded-md flex gap-1`}>
            <div className=' flex gap-2 items-center w-full lg:w-4/6 overflow-hidden'>
                {number &&
                    <div className={`sm:flex min-w-[50px] max-w-[70px] hidden items-center justify-center rounded-md`}>
                        {currentTrackId === track.id && isCurrentTrackPlaying ?
                            <img src="/playing.gif" className='min-w-[50px] max-w-[50px]' alt="playing" />
                            :
                            <>
                                {number}
                            </>}
                    </div>
                }
                <div className='flex justify-start items-center'>
                    <img src={track?.album?.images[0]?.url || ""} className='max-h-[60px] min-w-[60px] min-h-[60px] max-w-[60px] rounded-md' alt="loading" />
                </div>
                <div className='w-full text-start'>
                    <h1 className={`line-clamp-1 font-semibold ${currentTrackId === track.id ? "text-green-300" : "text-gray-300"}`}>{track.name} </h1>
                    <span className='line-clamp-1 space-x-2'>
                        {track.artists.map((artist) => (
                            <small key={artist.id} className='text-gray-300 font-extrabold underline'>
                                {artist.name}
                            </small>
                        ))}
                    </span>
                </div>
            </div>
            <div className='text-gray-300 text-start lg:block hidden font-semibold w-3/6'>
                <div className='line-clamp-1'>
                    {track.album.name}
                </div>
            </div>
            <div className='p-2 line-clamp-1 w-[100px] text-center'>{formatDuration(track.duration_ms)}</div>
        </button>
    )
}

export default Track