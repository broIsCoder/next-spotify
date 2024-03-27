import Link from 'next/link'
import React from 'react'

const ArtistCard = ({name,images}) => {
  return (
    <Link href={"/"} className='bg-slate-800 min-h-[60px] hover:bg-slate-700 duration-150 p-1 rounded-full w-full line-clamp-1 flex gap-2 items-center'>
    <div>
      <img src={images[0].url} className='bg-black rounded-full max-h-[50px] min-h-[50px] max-w-[50px] min-w-[50px]' alt="image" />
    </div>
    <div>
    <div className='line-clamp-1 overflow-hidden text-ellipsis'>{name}</div>
    </div>
  </Link>
  )
}

export default ArtistCard