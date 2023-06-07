'use client';

import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { useEffect, useState } from 'react';

import { ISong } from '@/types/types';
import SongListDetails from '../songList/SongListDetails';
import useSound from 'use-sound';

interface PlayerControlsProps {
  currentSong: ISong;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ currentSong }) => {
  const [isPlaying, setPlaying] = useState(false);

  const [volume, setVolume] = useState<0 | 1>(1);

  const [play, { sound, pause }] = useSound(
    `${process.env.NEXT_PUBLIC_API}${currentSong.audio}`,
    {
      volume: volume,
      onplay: () => setPlaying(true),
      onend: () => {
        setPlaying(false);
      },
      onpause: () => setPlaying(false),
      format: ['mp3'],
    }
  );

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  return (
    <>
      <div className='w-full'>
        <SongListDetails
          id={currentSong.id}
          title={currentSong.title}
          desc={currentSong.desc}
          author={currentSong.author}
          thumbnail={currentSong.thumbnail}
          audio={currentSong.audio}
          liked={currentSong.liked}
        />
      </div>
      <div className='flex items-center justify-center gap-4'>
        <button className='transition-all delay-100 ease-linear hover:scale-105'>
          <CgPlayTrackPrev size={30} />
        </button>
        <button
          className='rounded-full bg-neutral-500 p-1 transition-all delay-100 ease-linear hover:scale-105'
          onClick={() => {
            isPlaying ? pause() : play();
          }}
        >
          {isPlaying ? <BsPauseFill size={30} /> : <BsPlayFill size={30} />}
        </button>
        <button className='transition-all delay-100 ease-linear hover:scale-105'>
          <CgPlayTrackNext size={30} />
        </button>
      </div>
      <div className='flex items-center justify-center'>
        <button
          className='hidden transition-all delay-100 ease-linear hover:scale-105 md:block'
          onClick={() => setVolume((prev) => (prev === 1 ? 0 : 1))}
        >
          {volume === 0 ? (
            <HiSpeakerXMark size={20} />
          ) : (
            <HiSpeakerWave size={20} />
          )}
        </button>
      </div>
    </>
  );
};

export default PlayerControls;
