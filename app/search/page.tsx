'use client';

import { getSearchSongs } from '@/actions/getSearchSongs';
import Box from '@/components/box/Box';
import Header from '@/components/header/Header';
import SearchInput from '@/components/searchInput/SearchInput';
import SongList from '@/components/songList/SongList';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Home = async () => {
  const pathname = usePathname();

  const router = useRouter();

  const searchParams = useSearchParams()!;

  const search = searchParams.get('search');

  const songs = await getSearchSongs(search);

  console.log('songs', songs);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`${pathname}?search=${e.target.value}`);
  };

  return (
    <div className='h-full w-full'>
      <Box className='min-h-full'>
        <Header>
          <div>
            <h1 className='mb-6 text-4xl font-bold'>Search</h1>
          </div>
          <div>
            <SearchInput
              type='text'
              name='search'
              placeholder='What do you want to listen to?'
              onChange={handleChange}
            />
          </div>
        </Header>
        <div className='p-4'>{songs && <SongList songs={songs} />}</div>
      </Box>
    </div>
  );
};

export default Home;
