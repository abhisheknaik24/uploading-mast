import { use } from 'react';
import { TbPlaylist } from 'react-icons/tb';
import { BsPlus } from 'react-icons/bs';
import { getLibrarySongs } from '@/actions/getLibrarySongs';
import LibrarySongList from './LibrarySongList';

const Library = () => {
  const songs = use(getLibrarySongs());

  return (
    <div className='flex h-full w-full flex-col items-start justify-start gap-4'>
      <div className='flex w-full items-center justify-between text-neutral-400'>
        <div className='flex items-center justify-start gap-2'>
          <TbPlaylist size={25} />
          <p className='text-sm font-semibold'>Your Library</p>
        </div>
        <button className='hover:scale-110'>
          <BsPlus size={30} />
        </button>
      </div>
      <div>{songs && <LibrarySongList songs={songs} />}</div>
    </div>
  );
};

export default Library;
