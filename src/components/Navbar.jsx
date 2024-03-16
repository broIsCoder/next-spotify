"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"

const Navbar = () => {
    const { data: session, status } = useSession();
    console.log("Session Navbar : ", session)

    const [showProfile, setshowProfile] = useState(false)

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

    return (
        <div className='w-full h-full bg-transparent flex items-center justify-end p-1' style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0, 255, 140, 0.5)' }}>
            {status === "loading" && !session ?
                <div className="bg-black text-white rounded-full p-2">
                    <img src="/loading.gif" className='min-w-[25px] max-w-[25px] min-h-[25px] max-h-[25px] rounded-full' alt="loading..." />
                </div>
                :

                status === "authenticated" ?
                    <div className='h-full flex items-center justify-between w-full'>
                        <div className='flex items-center gap-5'>
                            <Link href={"/albums"} className='rounded-xl font-bold'>Albums</Link>
                            <Link href={"/artists"} className='rounded-xl font-bold'>Artists</Link>
                            <Link href={"/about"} className='rounded-xl font-bold'>About</Link>
                        </div>

                        <button className='profileTriggerBtn bg-black hover:bg-gray-700 duration-200 text-white text-2xl relative min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] rounded-full'>
                            {session?.user.name.toUpperCase()[0]}
                        </button>
                        {
                            showProfile &&
                            <div className='profile absolute py-3 top-16 rounded-xl font-semibold right-2 bg-gray-900 flex flex-col'>
                                <h1 className='bg-gray-900 hover:bg-gray-800 border-b-2 border-gray-500 p-2 duration-200'>
                                    {session?.user.name}
                                </h1>
                                <h1 className='bg-gray-900 hover:bg-gray-800 border-b-2 border-gray-500 p-2 duration-200'>
                                    {session?.user.email}
                                </h1>
                                <Link href={"/api/auth/signout?callbackUrl=/"} className='bg-red-600 hover:bg-red-700 duration-150 p-2 text-center font-extrabold'>Sign Out</Link>
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
