'use client';

import { addCurrentPlaySong } from '@/redux/song/songSlice';
import { RootState } from '@/redux/store';
import { ICurrentSong, ISong } from '@/types/types';
import Image from 'next/image';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';

interface SongCardDetailsProps {
  id: string;
  title: string;
  desc: string;
  author: string;
  thumbnail: string;
  audioLink: string;
  liked?: boolean;
}

const SongCardDetails: React.FC<SongCardDetailsProps> = ({
  id,
  title,
  desc,
  author,
  thumbnail,
  audioLink,
  liked,
}) => {
  const dispatch = useDispatch();

  const currentSong: ICurrentSong | null = useSelector(
    (state: RootState) => state.song.currentSong
  );

  const handleClick = () => {
    const songData: ICurrentSong = {
      id: id,
      title: title,
      desc: desc,
      author: author,
      thumbnail: thumbnail,
      audioLink: audioLink,
      liked: liked,
      isPlay: currentSong?.id === id && currentSong?.isPlay ? false : true,
      isMute: false,
    };

    dispatch(addCurrentPlaySong(songData));
  };

  return (
    <div className='group flex w-full cursor-pointer flex-col items-center justify-start gap-4 bg-neutral-800/50 p-4 transition-all delay-100 ease-linear hover:scale-105 hover:bg-neutral-800'>
      <div className='relative h-80 w-full sm:h-40'>
        <Image
          src='https://images.unsplash.com/photo-1682687221323-6ce2dbc803ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
          alt='img'
          className='rounded-sm object-cover'
          fill
        />
        <button
          className='invisible absolute bottom-1 right-1 flex items-center justify-center rounded-full bg-green-500 p-2 transition-all delay-100 ease-linear hover:scale-105 hover:bg-green-400 group-hover:visible'
          onClick={handleClick}
        >
          {currentSong && currentSong.id === id && currentSong.isPlay ? (
            <BsPauseFill size={30} />
          ) : (
            <BsPlayFill size={30} />
          )}
        </button>
      </div>
      <div className='flex flex-col items-start justify-start gap-1'>
        <h3 className='text-sm font-medium capitalize text-white'>{title}</h3>
        <p className='truncate text-xs text-neutral-100/50'>{author}</p>
      </div>
    </div>
  );
};

export default SongCardDetails;
