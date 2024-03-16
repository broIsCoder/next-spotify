import React from 'react'
import ArtistCard from './ArtistCard'

const Artists = () => {
    const response = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    return (
        <div className='overflow-auto overflow-x-hidden flex flex-col gap-1 w-full bg-blue-500'>
            {response.map((artist) => (
                <ArtistCard artist={artist} />
            ))}
        </div>
    )
}

export default Artists