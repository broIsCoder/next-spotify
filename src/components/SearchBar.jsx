import React from 'react'
import { FaSearch, FaXbox } from 'react-icons/fa'

const SearchBar = () => {
    return (
        <div className=' gap-1 items-center bg-gray-900 p-1 rounded-full w-auto flex xl:w-300px]'>
            <button className='p-3 rounded-full hover:text-white text-gray-500'>
                {FaSearch()}
            </button>
            <input className='focus-within:outline-none bg-gray-900 text-md w-full' type="text" />
            <button className='p-3 rounded-full hover:text-white text-gray-500'>
                {FaXbox()}
            </button>
        </div>
    )
}

export default SearchBar