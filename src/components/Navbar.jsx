"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import { FaGreaterThan, FaLessThan, FaSearch, FaXbox } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';

const Navbar = ({bgColor, toggleSidebar }) => {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const [showProfile, setshowProfile] = useState(false);
    const [showSidebar, setshowSidebar] = useState(false);

    const handleClickOutside = (e) => {
        if (e.target.closest(".profileTriggerBtn")) {
            setshowProfile((prev) => !prev);
        } else if (e.target.closest(".profile")) {
            setshowProfile(true);
        } else {
            setshowProfile(false);
        }
    }

    useEffect(() => {
        console.log("bgColor :::: ",bgColor);
        window.addEventListener("click", handleClickOutside)

        return () => {
            window.removeEventListener("click", handleClickOutside)
        }
    }, [])

    function hadleToggleSidebar() {
        setshowSidebar((prev) => !prev);
        toggleSidebar();
    }

    return (

        <div className={`z-10 p-3 sticky w-full top-0 ${bgColor} bg-opacity-60 backdrop-blur-xl flex items-center justify-end `}>
            {status === "loading" && !session ?

                <div className="bg-gray-900 text-white rounded-full p-2">
                    <img src="/loading.gif" className='min-w-[25px] max-w-[25px] min-h-[25px] max-h-[25px] rounded-full' alt="loading..." />
                </div>
                :

                status === "authenticated" ?
                    <div className='h-full flex items-center justify-between w-full'>
                        <div className='flex items-center gap-2'>
                            <button type='button' className='block md:hidden font-bold text-xl p-2 bg-gray-200 text-black rounded-full' onClick={hadleToggleSidebar}>
                                {
                                    showSidebar ?
                                        FaGreaterThan()
                                        :
                                        FaLessThan()
                                }
                            </button>

                            {/* <Link href={"/albums"} className='rounded-xl font-bold'>Albums</Link>
                            <Link href={"/artists"} className='rounded-xl font-bold'>Artists</Link>
                            <Link href={"/about"} className='rounded-xl font-bold'>About</Link> */}
                            {
                                pathname === '/search' &&
                                <div className='sm:flex hidden '>
                                <SearchBar />
                                </div>
                            }
                        </div>

                        <button className='profileTriggerBtn bg-gray-600 hover:bg-gray-700 duration-200 text-white text-2xl relative min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] rounded-full'>
                            {session?.user.name.toUpperCase()[0]}
                        </button>
                        {
                            showProfile &&
                            <div className='profile absolute py-3 top-20 rounded-xl font-semibold right-4 bg-gray-700 flex flex-col'>
                                <h1 className='bg-gray-700 hover:bg-gray-800 border-b-2 border-gray-500 p-2'>
                                    {session?.user.name}
                                </h1>
                                <h1 className='bg-gray-700 hover:bg-gray-800 border-b-2 border-gray-500 p-2'>
                                    {session?.user.email}
                                </h1>
                                <Link href={"/api/auth/signout?callbackUrl=/"} className='bg-gray-700 hover:bg-gray-800 p-2 text-center font-extrabold'>Sign Out</Link>
                            </div>
                        }
                    </div>
                    :
                    <div className='p-2'>
                        <Link href="/api/auth/signin" className="bg-black text-white rounded-full p-2">Sign In</Link>
                    </div>
            }
        </div>
    );
}

export default Navbar;
