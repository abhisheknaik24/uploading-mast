'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { routes } from '@/constant/routes';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import Logo from '../../../../components/logo/logo';
import Playlists from '../playlist/playlists';

const SidebarItem = dynamic(() => import('./sidebar-item'), {
  loading: () => <Skeleton className='h-6 w-full' />,
  ssr: false,
});

const Sidebar = () => {
  return (
    <div className='min-w-64 hidden h-full w-64 flex-col items-start justify-start gap-2 md:flex'>
      <div className='h-fit w-full flex flex-col items-start justify-start gap-4 p-4 bg-secondary/50 rounded-lg'>
        <Logo />
        {routes.map((route) => (
          <SidebarItem key={route.href} {...route} />
        ))}
      </div>
      <div className='h-full w-full p-4 bg-secondary/50 rounded-lg'>
        <Playlists />
      </div>
    </div>
  );
};

export default memo(Sidebar);
