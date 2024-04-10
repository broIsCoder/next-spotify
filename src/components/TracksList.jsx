import React, { useEffect, useState } from 'react';
import spotifyApi from '@/lib/spotify';
import { useSession } from 'next-auth/react';
import Track from './Track';

const TracksList = ({ playlistId }) => {
    const { data: session } = useSession();
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            spotifyApi.getPlaylistTracks(playlistId).then((data) => {
                setTracks(data.body.items);
            setLoading(false)
            }).catch((error) => {
                setError(error.message);
            });
        }
    }, [session]);

    if (loading) {
        return <div className='bg-gray-800 bg-opacity-65 h-fit space-y-2 p-2'>
            {[1, 2, 3, 4, 5].map((track) => (
                <div key={track} className='min-h-[70px] bg-gray-600 rounded-md animate-pulse dark:bg-gray-800'></div>
            ))}
        </div>
    }
    if (error) {
        return <div>{error}</div>
    }
    return (
        <div className=''>
            {tracks.map((item, i) => {
                return <Track key={i} track={item.track} number={i + 1} playlistId={playlistId} />
            })}
        </div>
    )
}

export default TracksList;
