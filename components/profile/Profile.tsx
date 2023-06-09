'use client';

import { RootState } from '@/redux/store';
import { deleteToken } from '@/redux/user/userSlice';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button/Button';

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const token: string | null = useSelector(
    (state: RootState) => state.user.token
  );

  const [email, setEmail] = useState('');

  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if (token) {
      const { email, exp } = jwt_decode<{ email: string; exp: number }>(token);

      setEmail(email);

      const currentTime = Date.now() / 1000;

      if (exp < currentTime) {
        dispatch(deleteToken());
      }
    }
  }, [dispatch, token]);

  return (
    <>
      <Button
        type='button'
        className='flex items-center justify-center rounded-full bg-neutral-900 p-2 text-white transition-all delay-100 ease-linear hover:scale-105'
        onClick={() => setActive((prev) => !prev)}
      >
        <BiUser size={25} />
      </Button>
      {isActive && (
        <div className='absolute right-0 top-12 z-50 w-full rounded-lg bg-neutral-900 text-neutral-400 drop-shadow-2xl'>
          <div className='flex w-full flex-col items-center justify-center gap-2 py-2 font-medium'>
            <Button
              type='button'
              className='w-full py-2 text-lg font-semibold text-white hover:bg-neutral-800'
            >
              {email}
            </Button>
            <Button
              type='button'
              className='w-full py-2 hover:bg-neutral-800 hover:text-white'
              onClick={() => dispatch(deleteToken())}
            >
              Log Out
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
