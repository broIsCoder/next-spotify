"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import { useRecoilValue } from 'recoil';
import { themeColorState } from '@/recoil/atom/themeColorAtom';

const Navbar = ({ toggleSidebar , scrolled }) => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    // const bgColor = useRecoilValue(themeColorState);
    const [bgColor, setbgColor] = useState("bg-blue-500")

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
        <header className={`z-10 min-h-[60px] dua max-h-[60px] px-2 sticky w-full transition-all top-0 ${bgColor} ${scrolled ?"bg-opacity-65 duration-300":"bg-opacity-100 duration-150"} backdrop-blur-xl flex items-center justify-between gap-2`}>
            <div className='flex gap-2 items-center h-full'>
                <button type='button' className='h-fit block md:hidden font-bold text-xl p-2 bg-gray-950 text-white rounded-full' onClick={hadleToggleSidebar}>
                    {
                        showSidebar ?
                            FaLessThan()
                            :
                            FaGreaterThan()
                    }
                </button>
                <div className='h-full flex items-center gap-2 justify-between w-full'>
                    {status === "authenticated" &&
                        <div className='flex gap-2 items-center h-full'>
                            {
                                pathname === '/search' && status === "authenticated" &&
                                <div className='sm:flex hidden '>
                                    <SearchBar />
                                </div>
                            }
                            <Link href={"/albums"} className='rounded-full font-bold bg-black p-2'></Link>
                            <Link href={"/artists"} className='rounded-full font-bold bg-black p-2'></Link>
                            <Link href={"/about"} className='rounded-full font-bold bg-black p-2 '></Link>
                        </div>
                    }
                </div>
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
            <div className='flex justify-center items-center'>
                {status === "loading" && !session ?
                    <div className="bg-gray-950 text-white rounded-full p-2">
                        <img src="/loading.gif" className='min-w-[25px] max-w-[25px] min-h-[25px] max-h-[25px] rounded-full' alt="loading..." />
                    </div>
                    :
                    status === "authenticated" ?
                        <button className={`profileTriggerBtn ${showProfile ? "bg-gray-400 text-black" : "bg-black text-white"} font-extrabold hover:bg-gray-500 duration-200 text-2xl relative min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] rounded-full`}>
                            {session?.user.name.toUpperCase()[0]}
                        </button>
                        :
                        <Link href="/api/auth/signin" className="bg-green-500 text-black font-bold rounded-full p-2">Sign In</Link>
                }
            </div>
        </header>
    );
}

export default Navbar;
