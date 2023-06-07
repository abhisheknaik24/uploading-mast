import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import Image from 'next/image';
import { postSongLike } from '@/actions/postSongLike';

interface SongListDetailsProps {
  id: string;
  title: string;
  desc: string;
  author: string;
  thumbnail: string;
  audio: string;
  liked?: boolean;
}

const SongListDetails: React.FC<SongListDetailsProps> = ({
  id,
  title,
  desc,
  author,
  thumbnail,
  audio,
  liked,
}) => {
  return (
    <div className='flex w-full cursor-pointer items-center justify-between p-2 transition-all delay-100 ease-linear hover:scale-105'>
      <div className='flex items-center justify-start gap-4'>
        <div className='relative h-16 w-16'>
          <Image
            src={thumbnail}
            alt={title}
            className='rounded-sm object-cover'
            fill
          />
        </div>
        <div className='flex flex-col items-start justify-start gap-1'>
          <h3 className='text-sm font-medium capitalize text-white'>{title}</h3>
          <p className='truncate text-xs text-neutral-100/50'>{author}</p>
        </div>
      </div>
      <div>
        <button
          className={`${liked ? 'text-red-700' : 'text-white'}`}
          onClick={() => postSongLike({ id: id })}
        >
          {liked ? <AiFillHeart size={25} /> : <AiOutlineHeart size={25} />}
        </button>
      </div>
    </div>
  );
};

export default SongListDetails;
