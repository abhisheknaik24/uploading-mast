'use client';

import { getCategories } from '@/actions/getCategories';
import { getSongs } from '@/actions/getSongs';
import Box from '@/components/box/Box';
import Header from '@/components/header/Header';
import {
  addCategories,
  addCurrentCategoryId,
  addSongs,
} from '@/redux/song/songSlice';
import { RootState } from '@/redux/store';
import { ICategory, IResponse } from '@/types/types';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Category = dynamic(() => import('@/components/category/Category'), {
  loading: () => (
    <div className='h-16 w-full animate-pulse rounded-sm bg-neutral-500/50'></div>
  ),
  ssr: false,
});

const SongCard = dynamic(() => import('@/components/songCard/SongCard'), {
  loading: () => (
    <div className='grid h-full w-full animate-pulse grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-5'>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
      <div className='h-56 w-full rounded-sm bg-neutral-500/50'></div>
    </div>
  ),
  ssr: false,
});

const Home = () => {
  const dispatch = useDispatch();

  const categories: ICategory[] = useSelector(
    (state: RootState) => state.song.categories
  );

  const currentCategory: ICategory | null = useSelector(
    (state: RootState) => state.song.currentCategory
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const data: IResponse = await getCategories();

      if (data.success && data.data.categories.length > 0) {
        dispatch(addCategories(data.data.categories));

        dispatch(addCurrentCategoryId(data.data.categories[0]._id));
      }
    };

    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    if (currentCategory) {
      const fetchSongs = async () => {
        const data: IResponse = await getSongs({
          categoryId: currentCategory._id,
        });

        if (data.success && data.data.songs.length > 0) {
          dispatch(addSongs(data.data.songs));
        }
      };

      fetchSongs();
    }
  }, [currentCategory, dispatch]);

  return (
    <div className='h-full w-full overflow-y-auto scrollbar-hide'>
      <Box className='min-h-full'>
        <Header>
          <div>
            <h1 className='mb-6 text-4xl font-bold'>Welcome Back</h1>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
            {categories &&
              categories.map((category) => (
                <Category
                  key={category._id}
                  _id={category._id}
                  category={category.category}
                  image={category.image}
                  name={category.name}
                  handleCategory={(id) => dispatch(addCurrentCategoryId(id))}
                />
              ))}
          </div>
        </Header>
        {currentCategory && (
          <div className='p-4'>
            <div className='flex h-full w-full flex-col items-start justify-start gap-4'>
              <div>
                <h3 className='text-2xl font-bold capitalize'>
                  {currentCategory.name}
                </h3>
              </div>
              <div className='w-full'>
                <SongCard />
              </div>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
};

export default Home;
