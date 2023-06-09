'use client';

import { IRoute } from '@/types/types';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import Box from '../box/Box';
import Logo from '../logo/Logo';

const SidebarItem = dynamic(() => import('./SidebarItem'), {
  loading: () => (
    <div className='h-6 w-full animate-pulse rounded-sm bg-neutral-500/50'></div>
  ),
  ssr: false,
});

const Library = dynamic(() => import('../library/Library'), {
  loading: () => (
    <div className='flex animate-pulse flex-col items-start justify-start gap-4'>
      <div className='h-6 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-10 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-10 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-10 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-10 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-10 w-full rounded-sm bg-neutral-500/50'></div>
    </div>
  ),
  ssr: false,
});

const Sidebar = () => {
  const pathname = usePathname();

  const routes: IRoute[] = [
    {
      href: '/',
      icon: HiHome,
      label: 'Home',
      active: pathname === '/',
    },
    {
      href: '/search',
      icon: BiSearch,
      label: 'Search',
      active: pathname === '/search',
    },
  ];

  return (
    <div className='min-w-64 hidden h-full w-64 flex-col items-start justify-start gap-2 md:flex'>
      <Box className='flex flex-col items-start justify-start gap-4 p-4'>
        <Logo />
        {routes.map((route) => (
          <SidebarItem
            key={route.label}
            href={route.href}
            icon={route.icon}
            active={route.active}
          >
            {route.label}
          </SidebarItem>
        ))}
      </Box>
      <Box className='h-full p-4'>
        <Library />
      </Box>
    </div>
  );
};

export default Sidebar;
