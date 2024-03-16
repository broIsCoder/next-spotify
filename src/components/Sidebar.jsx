"use client"
import { useState } from 'react';
import { FaCross, FaHome, FaSearch } from 'react-icons/fa';
import LinkComponent from './LinkComponent';
import Playlists from './Playlists';
import Artists from './Artists';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Sidebar = () => {
    const { data: session, status } = useSession();
    
    const [currentTab, setcurrentTab] = useState('playlists')
    return (
        <div className='h-full bg-gray-900 p-1 flex flex-col gap-2 sm:rounded-md max-w-[270px] sm:max-w-[50vw] w-[270px] z-10 min-w-[270px] absolute top-0 left-0 sm:relative sm:resize-x overflow-auto overflow-y-hidden duration-0'>
            <div className='flex flex-col h-1/5'>
                <LinkComponent title="Home" icon={<FaHome />} href={"/"} classname='h-full text-xl hover:bg-slate-700 bg-slate-800 duration-150 p-2 rounded-t-md font-semibold' />
                <LinkComponent title="Search" icon={<FaSearch />} href={"/search"} classname='h-full text-xl hover:bg-slate-700 bg-slate-800 duration-150 p-2 rounded-b-md font-semibold' />
            </div>

            <div className='flex flex-col h-4/5 justify-center bg-gray-800 rounded-md p-2 space-y-2'>
                {
                    status === "loading" && !session ?
                        <div className='h-full w-full flex justify-center items-center'>
                            <img src="/loading.gif" className='min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px]' alt="loading content..." />
                        </div>
                        :
                        status === "authenticated" ?
                            <>
                                <div className='max-h-1/6 flex flex-col gap-1'>
                                    <h1 className='text-xl font-semibold'>Your Playlists</h1>
                                    <div className='space-x-1 flex'>
                                        <button onClick={() => setcurrentTab("playlists")} className={`${currentTab === 'playlists' ? 'bg-white text-black' : 'bg-slate-900 hover:bg-slate-950 '} font-semibold p-1 px-3  rounded-full`}>Playlists</button>
                                        <button onClick={() => setcurrentTab("artists")} className={`${currentTab === 'artists' ? 'bg-white text-black ' : 'bg-slate-900 hover:bg-slate-950 '} font-semibold p-1 px-3  rounded-full`}>Artists</button>
                                    </div>
                                </div>
                                <div className='flex h-5/6 w-full'>
                                    {currentTab === "playlists"?
                                    <Playlists/>
                                    :
                                    <Artists/>
                                    }
                                </div>
                            </>
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
