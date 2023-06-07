import Image from 'next/image';

interface LibrarySongDetailsProps {
  title: string;
  desc: string;
  author: string;
  thumbnail: string;
  audioLink: string;
  liked?: boolean;
}

const LibrarySongDetails: React.FC<LibrarySongDetailsProps> = ({
  title,
  desc,
  author,
  thumbnail,
  audioLink,
  liked,
}) => {
  return (
    <div className='flex w-full cursor-pointer items-center justify-start gap-2 transition-all delay-100 ease-linear hover:scale-105'>
      <div className='relative h-10 w-10'>
        <Image
          src='https://images.unsplash.com/photo-1682687221323-6ce2dbc803ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
          alt='img'
          className='rounded-sm object-cover'
          fill
        />
      </div>
      <div>
        <h3 className='text-xs font-medium capitalize text-white'>{title}</h3>
      </div>
    </div>
  );
};

export default LibrarySongDetails;
