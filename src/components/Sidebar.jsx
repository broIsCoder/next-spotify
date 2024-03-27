"use client"
import { useState } from 'react';
import { FaHome, FaSearch } from 'react-icons/fa';
import LinkComponent from './LinkComponent';
import Playlists from './Playlists';
import Artists from './Artists';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Sidebar = () => {
    const { data: session, status } = useSession();
    console.log("sidebar",session );

    const [currentTab, setcurrentTab] = useState('playlists')
    return (
        <div className='h-full bg-black flex flex-col gap-2 md:rounded-md max-w-[270px] md:max-w-[50vw] w-[270px] z-10 min-w-[270px] md:resize-x overflow-auto overflow-y-hidden duration-0'>
            <div className='flex flex-col' style={{ height: "100px" }}>
                <LinkComponent title="Home" icon={<FaHome />} href={"/"} classname='h-full text-xl hover:bg-gray-800 bg-gray-900 duration-150 p-2 rounded-t-md font-semibold' />
                <LinkComponent title="Search" icon={<FaSearch />} href={"/search"} classname='h-full text-xl hover:bg-gray-800 bg-gray-900 duration-150 p-2 rounded-b-md font-semibold' />
            </div>

            <div className='flex flex-col h-full bg-gray-900 rounded-md p-2 space-y-2'>
                {
                    status === "loading" && !session ?
                        <div className='h-full w-full flex justify-center items-center'>
                            <img src="/loading.gif" className='min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px]' alt="loading content..." />
                        </div>
                        :
                        status === "authenticated" ?
                            <div className='h-full w-full flex flex-col gap-2'>
                                <div className='flex flex-col h-auto p-2 gap-1'>
                                    <div className='space-x-1 flex'>
                                        <button onClick={() => setcurrentTab("playlists")} className={`${currentTab === 'playlists' ? 'bg-white text-black' : 'bg-gray-700 hover:bg-gray-600 '} duration-100 font-semibold p-1 px-3  rounded-full text-sm`}>Your Playlists</button>
                                        <button onClick={() => setcurrentTab("artists")} className={`${currentTab === 'artists' ? 'bg-white text-black ' : 'bg-gray-700 hover:bg-gray-600 '} duration-100 font-semibold p-1 px-3  rounded-full text-sm`}>Artists</button>
                                    </div>
                                </div>
                                {currentTab === "playlists" ?
                                    <Playlists />
                                    :
                                    <Artists />
                                }
                            </div>
                            :
                            <div className='font-semibold flex flex-col justify-center items-center'>
                                <Link href="/api/auth/signin" className="text-xl bg-green-400 rounded-full px-5 py-2 text-black font-extrabold ">Sign In</Link>
                                <small>Connnect your Spotify account</small>
                            </div>
                }
            </div>
        </div>
    )
};

export default Sidebar;
