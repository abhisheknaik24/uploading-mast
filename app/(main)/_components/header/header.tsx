'use client';

import Logo from '@/components/logo/logo';
import { Input } from '@/components/ui/input';
import { routes } from '@/constant/routes';
import useDebounce from '@/hooks/use-debounce';
import { useModal } from '@/hooks/use-modal-store';
import { useSearch } from '@/hooks/use-search-store';
import { useUser } from '@/hooks/use-user';
import { ChevronLeft, ChevronRight, User2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import HeaderItem from './header-item';

const Header = () => {
  const router = useRouter();

  const [value, setValue] = useState<string>('');

  const debouncedValue = useDebounce<string>(value, 500);

  const { user } = useUser();

  const { onOpen } = useModal();

  const { setSearch } = useSearch();

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  return (
    <>
      <div className='mb-2 md:hidden'>
        <Logo />
      </div>
      <div className='flex items-center justify-start gap-2 mb-6'>
        <div className='flex items-center justify-start gap-2 md:hidden'>
          {routes.map((route) => (
            <HeaderItem key={route.href} {...route} />
          ))}
        </div>
        <div className='hidden items-center justify-start gap-2 md:flex'>
          <Button
            type='button'
            className='rounded-full'
            variant='outline'
            size='icon'
            onClick={() => router.back()}
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </Button>
          <Button
            type='button'
            className='rounded-full'
            variant='outline'
            size='icon'
            onClick={() => router.forward()}
          >
            <ChevronRight size={20} strokeWidth={3} />
          </Button>
        </div>
        <div className='w-full'>
          <Input
            type='text'
            id='search'
            name='search'
            placeholder='What do you want to listen to?'
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          {user ? (
            <Button
              type='button'
              className='rounded-full'
              size='icon'
              onClick={() => onOpen('profile', { ...user })}
            >
              <User2 size={20} strokeWidth={3} />
            </Button>
          ) : (
            <Button
              type='button'
              className='font-semibold truncate'
              onClick={() => onOpen('signIn')}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Header);
