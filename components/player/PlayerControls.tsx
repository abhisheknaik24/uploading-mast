'use client';

import { addCurrentSongId } from '@/redux/song/songSlice';
import { ISong } from '@/types/types';
import { useEffect, useState } from 'react';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import useSound from 'use-sound';
import Button from '../button/Button';
import SongListDetails from '../songList/SongListDetails';

interface PlayerControlsProps {
  currentSong: ISong;
  previousSong: ISong | null;
  nextSong: ISong | null;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  currentSong,
  previousSong,
  nextSong,
}) => {
  const dispatch = useDispatch();

  const [isPlaying, setPlaying] = useState<boolean>(false);

  const [volume, setVolume] = useState<0 | 1>(1);

  const [play, { sound, pause }] = useSound(
    process.env.NEXT_PUBLIC_API + '/audio/' + currentSong.audio,
    {
      volume: volume,
      format: ['mp3'],
      onplay: () => setPlaying(true),
      onpause: () => setPlaying(false),
      onend: () => {
        setPlaying(false);
      },
    }
  );

  useEffect(() => {
    setTimeout(() => {
      sound?.play();
    }, 1000);

    return () => {
      sound?.unload();
    };
  }, [sound]);

  return (
    <>
      <div className='w-full'>
        <SongListDetails
          _id={currentSong._id}
          title={currentSong.title}
          desc={currentSong.desc}
          author={currentSong.author}
          thumbnail={currentSong.thumbnail}
          audio={currentSong.audio}
        />
      </div>
      <div className='flex items-center justify-center gap-4'>
        {previousSong ? (
          <Button
            type='button'
            className='transition-all delay-100 ease-linear hover:scale-105'
            onClick={() => dispatch(addCurrentSongId(previousSong._id))}
          >
            <CgPlayTrackPrev size={30} />
          </Button>
        ) : (
          <Button
            type='button'
            className='cursor-not-allowed text-neutral-700'
            disabled
          >
            <CgPlayTrackPrev size={30} />
          </Button>
        )}
        <Button
          type='button'
          className='rounded-full bg-neutral-500 p-1 transition-all delay-100 ease-linear hover:scale-105'
          onClick={() => {
            isPlaying ? pause() : play();
          }}
        >
          {isPlaying ? <BsPauseFill size={30} /> : <BsPlayFill size={30} />}
        </Button>
        {nextSong ? (
          <Button
            type='button'
            className='transition-all delay-100 ease-linear hover:scale-105'
            onClick={() => dispatch(addCurrentSongId(nextSong._id))}
          >
            <CgPlayTrackNext size={30} />
          </Button>
        ) : (
          <Button
            type='button'
            className='cursor-not-allowed text-neutral-700'
            disabled
          >
            <CgPlayTrackNext size={30} />
          </Button>
        )}
      </div>
      <div className='flex items-center justify-center'>
        <Button
          type='button'
          className='hidden transition-all delay-100 ease-linear hover:scale-105 md:block'
          onClick={() => setVolume((prev) => (prev === 1 ? 0 : 1))}
        >
          {volume === 0 ? (
            <HiSpeakerXMark size={20} />
          ) : (
            <HiSpeakerWave size={20} />
          )}
        </Button>
      </div>
    </>
  );
};

export default PlayerControls;
