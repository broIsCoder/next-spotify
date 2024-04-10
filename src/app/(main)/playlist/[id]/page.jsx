"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaClock, FaDotCircle, FaEllipsisH, FaPause, FaPlay } from 'react-icons/fa';
import { cleanUpHtml } from '@/lib/utilities';
import { currentTrackIdState, currentTrackTypeState, isCurrentTrackPlayingState } from '@/recoil/atom/trackAtom';
import { useRecoilState } from 'recoil';
import Footer from '@/components/Footer';
import { currentPlaylistIdState } from '@/recoil/atom/playlistAtom';
import { themeColorState } from '@/recoil/atom/themeColorAtom';
import spotifyApi from '@/lib/spotify';
import colors from '@/lib/themes';
import TracksList from '@/components/TracksList';

const PlaylistPage = ({ params }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPlaying, setIsPlaying] = useRecoilState(isCurrentTrackPlayingState);
  // const [bgColor, setBgColor] = useRecoilState(themeColorState);
  const [bgColor, setbgColor] = useState("bg-blue-500")

  const [currentPlaylistId, setCurrentPlaylistId] = useRecoilState(currentPlaylistIdState);
  const [playlist, setPlaylist] = useState(null);
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [currentTrackType, setCurrentTrackType] = useRecoilState(currentTrackTypeState);

  useEffect(() => {
    if (session) {
      spotifyApi.getPlaylist(params.id).then((data) => {
        setPlaylist(data.body);
        setLoading(false);
      }).catch((error) => {
        setError(error.message);
      });
    }
  }, [session]);

  function togglePlayPausePlaylist() {
    if (currentPlaylistId === playlist.id) {
      setIsPlaying((prev) => !prev);
      //TODO: play/pause , current track in the current playlist
    } else {
      setIsPlaying(true);
      setCurrentTrackId(playlist?.tracks?.items[0].track.id);
      setCurrentTrackType(playlist?.tracks?.items[0].track.type);
      //TODO:  play the first track  in playlist
    }
    setCurrentPlaylistId(playlist.id);
  }

  if (error) {
    return (
      <div className='h-full w-full bg-black flex justify-center items-center'>
        <h1>{error}</h1>
      </div>
    )
  } else {
    if (loading) {
      return (
        <section className='space-y-2 duration-300'>
          <div className='flex p-3 gap-2 items-end mt-6'>
            <div className='rounded-md aspect-square w-1/3 h-1/3 max-w-[180px] max-h-[180px] min-h-[140px] min-w-[140px] bg-gray-700 animate-pulse dark:bg-gray-800'></div>
            <div className='space-y-2 w-full'>
              <div className='bg-gray-900 animate-pulse dark:bg-gray-800 rounded-md p-2 w-1/2'></div>
              <div className='bg-gray-900 animate-pulse dark:bg-gray-800 rounded-md p-4 w-4/4'></div>
              <div className='bg-gray-900 animate-pulse dark:bg-gray-800 rounded-md p-2 w-2/3'></div>
              <div className='bg-gray-900 animate-pulse dark:bg-gray-800 rounded-md p-3 w-1/2'></div>
            </div>
          </div>
          <div className='bg-gray-800 bg-opacity-65 h-fit space-y-2 pt-28 px-2'>
            {[1, 2, 3, 4, 5].map((track) => (
              <div key={track} className='min-h-[70px] bg-gray-600 rounded-md animate-pulse dark:bg-gray-800'></div>
            ))}
          </div>
        </section>
      )
    }
    return (
      <section className={`space-y-2 duration-1000 ${bgColor}`}>
        <div className='flex flex-col gap-2 p-3 mt-6'>
          <div className='flex flex-row justify-center items-end h-fit overflow-auto gap-2'>
            <img src={playlist?.images[0].url} className='rounded-md aspect-square w-1/3 h-1/3 max-w-[180px] max-h-[180px] min-h-[140px] min-w-[140px]' alt="playlist_img" />
            <div className='h-full w-full text-ellipsis overflow-hidden'>
              <small className=''>{playlist?.type}</small>
              <h1 className='text-xl md:text-2xl font-extrabold'>{playlist?.name}</h1>
              <small>{cleanUpHtml(playlist?.description)}</small>
              <div className='flex gap-2 items-center'>
                <span className='font-extrabold flex-wrap flex'>{playlist?.owner.display_name}</span>
                <FaDotCircle />
                <small className='font-semibold'> {playlist?.tracks.total} items</small>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='h-fit bg-opacity-30 bg-gradient-to-b bg-black from-transparent from-0% to-[220px] to-gray-900 py-2'>
            <div className='flex gap-5 px-3 py-2'>
              <button className='p-5 text-xl text-black bg-green-400 rounded-full' onClick={togglePlayPausePlaylist}>{isPlaying && playlist.id === currentPlaylistId ? FaPause() : FaPlay()}</button>
              <button className='text-2xl text-gray-400 rounded-full'>{FaEllipsisH()}</button>
            </div>
            <div className='p-0 pb-2 md:p-2 h-fit flex flex-col gap-1'>
              <div className='text-gray-400 justify-between items-center flex gap-1 p-1'>
                <div className='lg:w-4/6 w-full font-extrabold flex items-center gap-2 '>
                  <div className='p-2 min-w-[50px] max-w-[70px] flex justify-center items-center'>#</div>
                  <div>Title</div>
                </div>
                <div className='lg:block w-3/6 hidden font-extrabold '>Album</div>
                <div className='w-[100px] flex justify-center p-2 '>{FaClock()}</div>
              </div>
              <TracksList playlistId={playlist?.id} />
            </div>
          </div>

          <Footer />
        </div>
      </section>
    )
  }
}

export default PlaylistPage