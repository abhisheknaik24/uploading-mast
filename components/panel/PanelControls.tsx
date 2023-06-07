'use client';

import SongListDetails from '../songList/SongListDetails';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { CgPlayTrackPrev, CgPlayTrackNext } from 'react-icons/cg';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import useSound from 'use-sound';
import { useEffect, useState } from 'react';
import { ICurrentSong } from '@/types/types';

interface PanelControlsProps extends ICurrentSong {
  handleUpdateSongPlay: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleupdateSongMute: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PanelControls: React.FC<PanelControlsProps> = ({
  id,
  title,
  desc,
  author,
  thumbnail,
  audioLink,
  liked,
  isPlay,
  isMute,
  handleUpdateSongPlay,
  handleupdateSongMute,
}) => {
  const [volume, setVolume] = useState(1);

  const [play, { sound, pause }] = useSound(
    `${process.env.NEXT_PUBLIC_API}${audioLink}`,
    {
      volume: volume,
      onend: () => {
        handleUpdateSongPlay;
      },
      format: ['mp3'],
    }
  );

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  useEffect(() => {
    if (!isPlay) {
      pause();
    } else {
      play();
    }
  }, [isPlay, play, pause]);

  useEffect(() => {
    if (isMute) {
      setVolume(0);
    } else {
      setVolume(1);
    }
  }, [isMute, sound]);

  return (
    <>
      <div>
        <SongListDetails
          title={title}
          desc={desc}
          author={author}
          thumbnail={thumbnail}
          audioLink={audioLink}
          liked={liked}
        />
      </div>
      <div className='flex items-center justify-center gap-4'>
        <button className='transition-all delay-100 ease-linear hover:scale-105'>
          <CgPlayTrackPrev size={30} />
        </button>
        <button
          className='rounded-full bg-neutral-500 p-1 transition-all delay-100 ease-linear hover:scale-105'
          onClick={handleUpdateSongPlay}
        >
          {isPlay ? <BsPauseFill size={30} /> : <BsPlayFill size={30} />}
        </button>
        <button className='transition-all delay-100 ease-linear hover:scale-105'>
          <CgPlayTrackNext size={30} />
        </button>
      </div>
      <div className='flex items-center justify-center'>
        <button
          className='hidden transition-all delay-100 ease-linear hover:scale-105 md:block'
          onClick={handleupdateSongMute}
        >
          {isMute ? <HiSpeakerXMark size={25} /> : <HiSpeakerWave size={25} />}
        </button>
      </div>
    </>
  );
};

export default PanelControls;
