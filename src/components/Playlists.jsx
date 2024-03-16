import React from 'react'
import PlaylistCard from './PlaylistCard'

const Playlists = () => {
  const response = ['good','bad','worst','best','terrifying','disgusting','exciting','akward','sleepy']
  return (
    <div className='overflow-auto overflow-x-hidden flex flex-col gap-1 w-full bg-red-700'>
    {response.map((playlist) => (
        <PlaylistCard playlist={playlist} />
    ))}
</div>
  )
}

export default Playlists