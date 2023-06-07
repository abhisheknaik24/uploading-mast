import Image from 'next/image';

interface PlaylistProps {
  category: string;
  image?: string;
  label: string;
  handlePlaylist: (category: string, label: string) => void;
}

const Playlist: React.FC<PlaylistProps> = ({
  category,
  image,
  label,
  handlePlaylist,
}) => {
  return (
    <div
      className='flex w-full cursor-pointer items-center justify-start gap-6 rounded-sm bg-neutral-700/50 transition-all delay-100 ease-linear hover:scale-105'
      onClick={() => handlePlaylist(category, label)}
    >
      <div className='relative h-16 w-1/5'>
        <Image
          src={image || ''}
          alt='img'
          className='rounded-sm object-cover'
          fill
        />
      </div>
      <p className='font-semibold'>{label}</p>
    </div>
  );
};

export default Playlist;
