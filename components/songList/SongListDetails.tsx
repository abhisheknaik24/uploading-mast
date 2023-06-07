import Image from 'next/image';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

interface SongListDetailsProps {
  title: string;
  desc: string;
  author: string;
  thumbnail: string;
  audioLink: string;
  liked?: boolean;
}

const SongListDetails: React.FC<SongListDetailsProps> = ({
  title,
  desc,
  author,
  thumbnail,
  audioLink,
  liked,
}) => {
  return (
    <div className='flex w-full cursor-pointer items-center justify-start gap-4 p-2 transition-all delay-100 ease-linear hover:scale-105'>
      <div className='relative h-10 w-10'>
        <Image
          src='https://images.unsplash.com/photo-1682687221323-6ce2dbc803ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
          alt='img'
          className='rounded-sm object-cover'
          fill
        />
      </div>
      <div className='flex flex-col items-start justify-start gap-1'>
        <h3 className='text-sm font-medium capitalize text-white'>{title}</h3>
        <p className='truncate text-xs text-neutral-100/50'>{author}</p>
      </div>
      <div className='float-right'>
        <button className={`${liked ? 'text-red-700' : 'text-white'}`}>
          {liked ? <AiFillHeart size={25} /> : <AiOutlineHeart size={25} />}
        </button>
      </div>
    </div>
  );
};

export default SongListDetails;
