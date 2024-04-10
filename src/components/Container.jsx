"use client"
import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import { playlistBgColorState } from '@/recoil/atom/playlistAtom';
import { useRecoilValue } from 'recoil';
import { themeColorState } from '@/recoil/atom/themeColorAtom';


const Container = ({ children }) => {
    const containerRef = useRef(null);
    const [isscrolled, setisScrolled] = useState(false);
    const [bgColor, setbgColor] = useRecoilValue(themeColorState)

    const toggleSidebar = () => {
        const container = containerRef.current;
        console.log("left", container.scrollLeft)
        if (container.scrollLeft === 0) {
            const remainingScrollRight = container.scrollWidth - container.clientWidth;
            container.scrollLeft = remainingScrollRight;
        } else {
            container.scrollLeft = 0;
        }
    };

    const handleScroll = (event) => {
        const scrolltop = event.currentTarget.scrollTop;
        if (scrolltop > 70) {
            setisScrolled(true)
        } else {
            setisScrolled(false)
        }
    };
    
    return (
        <main ref={containerRef} className='duration-200 transition-all flex h-[87vh] w-full gap-2 relative overflow-x-scroll'>
            {children[0]}
            <section onScroll={handleScroll} className={`h-full min-w-full md:w-full md:min-w-0 overflow-auto scroll-smooth rounded-md flex flex-col`}>
                <Navbar toggleSidebar={toggleSidebar} scrolled={isscrolled} />
                {children[1]}
            </section>
        </main>

    );
};

export default Container;
