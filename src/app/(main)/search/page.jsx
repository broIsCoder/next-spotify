"use client"
import ArtistCard from '@/components/ArtistCard'
import PlaylistCard from '@/components/PlaylistCard'
import SearchBar from '@/components/SearchBar'
import Track from '@/components/Track'
import spotifyApi from '@/lib/spotify'
import { searchQueryState, searchResultsState, searchResultsTypeState } from '@/recoil/atom/searchResultsAtom'
import { themeColorState } from '@/recoil/atom/themeColorAtom'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

const searchPage = () => {
  const { data: session, status } = useSession();
  const [searchResults, setsearchResults] = useRecoilState(searchResultsState);
  const [resultType, setResultType] = useRecoilState(searchResultsTypeState);
  const [searchQuery, setsearchQuery] = useRecoilState(searchQueryState)
  const [loading, setloading] = useState(false)
  const [bgColor,setBgColor] = useRecoilState(themeColorState);
  
  // useEffect(() => {
  //   setBgColor("bg-gray-900")
  // })
  
  const types = [
    "track",
    "playlist",
    "artist",
    "album",
    "show",
    "episode"
  ]

  function handleClickType(type) {
    setResultType(type);
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && session) {
      if (searchQuery !== '') {
        setloading(true);
        spotifyApi.search(searchQuery, [resultType]).then((data) => {
          setsearchResults(data.body)
        })
        setloading(false);
      }
    }
  }, [searchQuery, resultType, spotifyApi])

  

  return (
    <div className='p-2 relative w-full'>
      {status === "authenticated" &&
        <>
          <div className='pb-2 flex flex-col justify-center items-center sm:hidden'>
            <SearchBar />
          </div>
          <div className='flex flex-wrap w-full gap-1'>
            {types.map((type, i) => (
              <button onClick={() => { handleClickType(type) }} key={i} className={`${type === resultType ? "bg-white text-black font-bold" : "bg-gray-700 hover:bg-gray-600"} gap-2 flex justify-center items-center text-sm p-1 px-3 rounded-full`}>
                <span>{type}</span>
              </button>
            ))}
          </div>
        </>
      }
      <div className='pt-2 '>
        {
          loading &&
          <div className=''>
            <img src="/loading.gif" alt="loading search..." />
            <h1>Loading Your Search</h1>
          </div>
        }
        {searchQuery !== '' && searchResults[resultType + "s"]?.total > 0 && searchResults[resultType + "s"]?.items.map((item, i) => {
          switch (resultType) {
            case types[0]:
              return <Track key={item.id} track={item} />;
            case types[1]:
              return <PlaylistCard key={item.id} {...item} />
            case types[2]:
              // return <h1>df</h1>
              return <ArtistCard key={item.id} {...item} />
            case types[3]:
              return <div key={item.id}>{item?.name}</div>
            case types[4]:
              return <div key={item.id}>{item?.name}</div>
            case types[5]:
              return <div key={item.id}>{item?.name}</div>
            default:
              return null
          }
        })}

        {searchQuery === '' &&
          <div className='h-96 flex justify-center items-center text-3xl font-bold text-gray-500'>Search {resultType}s</div>
        }
        {searchResults?.[resultType + 's']?.total === 0 &&
          <div className='h-96 text-3xl font-bold flex justify-center items-center'>
            No {resultType} founded
          </div>
        }
      </div>
    </div>
  )
}

export default searchPage