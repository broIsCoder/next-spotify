"use client"
import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { playlistIdState } from '@/recoil/atom/playlistAtom';
import { useRecoilValue } from 'recoil';
import { usePathname } from 'next/navigation';

const colors = [
    "bg-indigo-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-purple-500",
];

const Container = ({ children }) => {
    const containerRef = useRef(null);
    const pathname = usePathname();

    const toggleSidebar = () => {
        const container = containerRef.current;
        if (container.scrollLeft === 0) {
            const remainingScrollRight = container.scrollWidth - container.clientWidth;
            container.scrollLeft = remainingScrollRight;
        } else {
            container.scrollLeft = 0;
        }
        console.log("left", container.scrollLeft)
    };


    const [color, setcolor] = useState("");
    const playlistId = useRecoilValue(playlistIdState);
    const getRandom = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    useEffect(() => {
        pathname.includes("/playlist") ? setcolor(getRandom()) : setcolor(null)
    }, [playlistId,pathname]);

    useEffect(() => {

    }, [])
    
    return (
        <main ref={containerRef} className='duration-200 transition-all flex h-[87vh] w-full gap-2 relative overflow-auto scroll-smooth'>
            <Sidebar />
            <section className={`h-full min-w-full md:w-full md:min-w-0 overflow-auto rounded-md flex ${color || "bg-gray-900"} flex-col
            `}>
                <Navbar bgColor={color || "bg-gray-800"} toggleSidebar={toggleSidebar} />
                {children}
            </section>
        </main>

    );
};

export default Container;
