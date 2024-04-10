"use client"
import { searchQueryState, searchResultsState, searchResultsTypeState } from '@/recoil/atom/searchResultsAtom';
import React, { useEffect, useRef } from 'react'
import { FaSearch, FaXing } from 'react-icons/fa'
import { useRecoilState, useRecoilValue } from 'recoil';

const SearchBar = () => {
    const [searchQuery, setsearchQuery] = useRecoilState(searchQueryState)
    const resultType = useRecoilValue(searchResultsTypeState);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    })
    
    return (
        <div className=' gap-1 items-center bg-gray-950 p-1 rounded-full w-full sm:w-auto flex xl:w-300px]'>
            <button className='p-2 rounded-full text-gray-500'>
                {FaSearch()}
            </button>
            <input ref={inputRef} value={searchQuery} onChange={(e) => { setsearchQuery(e.target.value) }} className='focus-within:outline-none bg-gray-950 text-md w-full' type="text" />
            <small className='bg-white max-w-[70px] flex justify-center items-center min-w-[70px] text-center text-black rounded-full p-1 px-3 font-bold'>{resultType}</small>
            <button onClick={() => { setsearchQuery("") }} className='p-2 rounded-full hover:text-white text-gray-500'>
                {FaXing()}
            </button>
        </div>
    )
}

export default SearchBar