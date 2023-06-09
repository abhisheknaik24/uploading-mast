import { ICategory } from '@/types/types';
import Image from 'next/image';

interface CategoryProps extends ICategory {
  handleCategory: (id: string) => void;
}

const Category: React.FC<CategoryProps> = ({
  _id,
  category,
  image,
  name,
  handleCategory,
}) => {
  return (
    <div
      className='flex w-full cursor-pointer items-center justify-start gap-6 rounded-sm bg-neutral-700/50 transition-all delay-100 ease-linear hover:scale-105'
      onClick={() => handleCategory(_id)}
    >
      <div className='relative h-16 w-1/5'>
        <Image
          src={
            image
              ? process.env.NEXT_PUBLIC_API + '/images/' + image
              : '/assets/images/default-img.webp'
          }
          alt='img'
          className='rounded-sm object-cover'
          fill
        />
      </div>
      <p className='font-semibold capitalize'>{name}</p>
    </div>
  );
};

export default Category;
