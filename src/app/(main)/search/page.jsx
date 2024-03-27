import SearchBar from '@/components/SearchBar'
import React from 'react'
import { FaSearch, FaXbox } from 'react-icons/fa'

const searchPage = () => {
  return (
    <div className='p-2 flex flex-col justify-center items-center'>
      <div className='block sm:hidden'>
        <SearchBar />
      </div>
    </div>
  )
}

export default searchPage