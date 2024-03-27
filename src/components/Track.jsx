import React from 'react'
import { formatDuration } from '@/lib/utilities'

const Track = ({item,number}) => {
    return (
        <div className='p-1 px-4 hover:bg-gray-700 w-full items-center justify-between rounded-md flex gap-1'>
            <div className='flex gap-2 items-center w-4/6 overflow-hidden'>
                <div className='sm:flex text-gray-300 min-w-[50px] max-w-[70px] hidden items-center justify-center rounded-md'>
                    {number}
                </div>
                <div className='bg-black flex justify-center items-center'>
                    <img src={item.track.preview_url} className='w-[50px] h-[50px]' alt="loading" />
                </div>
                <div className='flex flex-col w-5/6'>
                    <h1 className='w-full overflow-hidden text-ellipsis line-clamp-1 font-semibold'>{item.track.name} </h1>

                    <div className='w-full line-clamp-1'>
                        {item.track.artists.map((artist) => (
                            <small key={artist.id} className='text-gray-300 font-extrabold'>{artist.name} </small>
                        ))}
                    </div>

                </div>
            </div>
            <div className='text-gray-300 sm:block hidden font-semibold w-2/6'>
                <div className='line-clamp-1'>
                    {item.track.album.name}
                </div>
            </div>
            <div className=''>{formatDuration(item.track.duration_ms)}</div>
        </div>
    )
}

export default Track