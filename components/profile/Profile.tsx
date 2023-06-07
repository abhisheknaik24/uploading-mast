'use client';

import { BiUser } from 'react-icons/bi';
import { deleteToken } from '@/redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const Profile = () => {
  const [isActive, setActive] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      <button
        className='flex items-center justify-center rounded-full bg-neutral-900 p-2 text-white transition-all delay-100 ease-linear hover:scale-105'
        onClick={() => setActive((prev) => !prev)}
      >
        <BiUser size={25} />
      </button>
      {isActive && (
        <div className='absolute right-0 top-12 z-50 w-full rounded-lg bg-neutral-900 text-neutral-400 drop-shadow-2xl'>
          <div className='flex w-full flex-col items-center justify-center gap-2 py-2 font-medium'>
            <button className='w-full py-2 text-lg font-semibold text-white hover:bg-neutral-800'>
              Abhishek Naik
            </button>
            <button
              className='w-full py-2 hover:bg-neutral-800 hover:text-white'
              onClick={() => dispatch(deleteToken())}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
