import Image from 'next/image';

interface TilesProps {
  image: string;
  label: string;
}

const Tiles: React.FC<TilesProps> = ({ image, label }) => {
  return (
    <div className='flex w-full cursor-pointer items-center justify-start gap-6 rounded-sm bg-neutral-700/50 transition-all delay-100 ease-linear hover:scale-105'>
      <div className='relative h-16 w-1/5'>
        <Image src={image} alt='img' className='rounded-sm object-cover' fill />
      </div>
      <p className='font-semibold'>{label}</p>
    </div>
  );
};

export default Tiles;
