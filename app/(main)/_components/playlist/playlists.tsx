'use client';

import { getPlaylists } from '@/actions/getPlaylists';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useModal } from '@/hooks/use-modal-store';
import { useUser } from '@/hooks/use-user';
import { ListMusic, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useQuery } from 'react-query';

const PlaylistCard = dynamic(
  () => import('@/app/(main)/_components/playlist/playlist-card'),
  {
    loading: () => <Skeleton className='h-10 w-full' />,
    ssr: false,
  }
);

const Playlists = () => {
  const { user } = useUser();

  const { onOpen } = useModal();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['playlists'],
    queryFn: getPlaylists,
    refetchInterval: 60000,
  });

  const handleClick = () => {
    return onOpen('addPlaylist');
  };

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-2'>
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
      </div>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <div className='flex h-full w-full flex-col items-start justify-start gap-4'>
      <div className='flex w-full items-center justify-between text-neutral-400'>
        <div className='flex items-center justify-start gap-2'>
          <ListMusic size={20} />
          <p className='text-sm font-semibold'>My Playlist</p>
        </div>
        {user && (
          <div className='flex items-center justify-start'>
            <Button
              type='button'
              className='h-6 w-6 rounded-full hover:scale-110'
              variant='ghost'
              size='icon'
              onClick={handleClick}
            >
              <Plus size={20} />
            </Button>
          </div>
        )}
      </div>
      <div className='w-full grid grid-cols-1 gap-2 overflow-y-auto scrollbar-hide'>
        {!!data?.playlists.length &&
          data.playlists.map((playlist: { id: string; name: string }) => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
      </div>
    </div>
  );
};

export default memo(Playlists);
