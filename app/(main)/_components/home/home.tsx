'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useModal } from '@/hooks/use-modal-store';
import { useUser } from '@/hooks/use-user';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const Songs = dynamic(() => import('../song/songs'), {
  loading: () => (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      <Skeleton className='h-[184px] w-full sm:h-60' />
      <Skeleton className='h-[184px] w-full sm:h-60' />
      <Skeleton className='h-[184px] w-full sm:h-60' />
      <Skeleton className='h-[184px] w-full sm:h-60' />
      <Skeleton className='h-[184px] w-full sm:h-60' />
    </div>
  ),
  ssr: false,
});

const Home = () => {
  const { user } = useUser();

  const { onOpen } = useModal();

  const handleClick = () => {
    return onOpen('addSong');
  };

  return (
    <>
      <div className='mb-6 flex flex-col items-center justify-between md:flex-row'>
        <div className='w-full flex items-center justify-start'>
          <h1 className='text-4xl font-bold capitalize'>
            Welcome Back{' '}
            <span className='text-emerald-500'>
              {user?.username || 'guest'}
            </span>
            !
          </h1>
        </div>
        {user && (
          <div className='w-full flex items-center justify-end'>
            <Button type='button' variant='outline' onClick={handleClick}>
              Add Song
            </Button>
          </div>
        )}
      </div>
      <Songs />
    </>
  );
};

export default memo(Home);
