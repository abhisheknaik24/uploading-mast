'use client';

import { getSongs } from '@/actions/getSongs';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearch } from '@/hooks/use-search-store';
import { useSong } from '@/hooks/use-song-store';
import dynamic from 'next/dynamic';
import { memo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

const SongCard = dynamic(
  () => import('@/app/(main)/_components/song/song-card'),
  {
    loading: () => <Skeleton className='h-[184px] w-full sm:h-60' />,
    ssr: false,
  }
);

const Songs = () => {
  const { playlistId } = useSong();

  const { search } = useSearch();

  const { ref, inView } = useInView();

  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: ['songs', playlistId, search],
    queryFn: ({ queryKey, pageParam = 1 }) =>
      getSongs({
        playlistId: queryKey[1] as string,
        search: queryKey[2] as string,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.songs.length === 10 ? lastPage.page + 1 : undefined,
    enabled: !!playlistId,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return (
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        <Skeleton className='h-[184px] w-full sm:h-60' />
        <Skeleton className='h-[184px] w-full sm:h-60' />
        <Skeleton className='h-[184px] w-full sm:h-60' />
        <Skeleton className='h-[184px] w-full sm:h-60' />
        <Skeleton className='h-[184px] w-full sm:h-60' />
      </div>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <div className='grid grid-cols-2 gap-4 pb-20 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {!!data?.pages.length &&
        data.pages.map((page) =>
          page.songs.map(
            (song: {
              id: string;
              playlistId: string;
              title: string;
              description: string;
              author: string;
              thumbnail: string;
              audio: string;
            }) => <SongCard key={song.id} {...song} />
          )
        )}
    </div>
  );
};

export default memo(Songs);
