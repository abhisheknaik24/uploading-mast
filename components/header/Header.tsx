'use client';

import { IInput, IUser } from '@/types/types';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { addToken } from '@/redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';

import Auth from '../auth/Auth';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import Link from 'next/link';
import Modal from '../modal/Modal';
import { RootState } from '@/redux/store';
import { signIn } from '@/actions/signIn';
import { signUp } from '@/actions/signUp';
import { useState } from 'react';
import Profile from '../profile/Profile';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const dispatch = useDispatch();

  const [isSignIn, setSignIn] = useState<boolean>(true);

  const [user, setUser] = useState<IUser>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const token: string | null = useSelector(
    (state: RootState) => state.user.token
  );

  const pathname = usePathname();

  const router = useRouter();

  const signInInputs: IInput[] = [
    { label: 'Email Address', type: 'email', id: 'email', name: 'email' },
    { label: 'Password', type: 'password', id: 'password', name: 'password' },
  ];

  const signUpInputs: IInput[] = [
    { label: 'First Name', type: 'text', id: 'firstname', name: 'firstname' },
    { label: 'Last Name', type: 'text', id: 'lastname', name: 'lastname' },
    { label: 'Email Address', type: 'email', id: 'email', name: 'email' },
    { label: 'Password', type: 'password', id: 'password', name: 'password' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSignIn) {
      if (
        user.firstname !== '' &&
        user.lastname !== '' &&
        user.email !== '' &&
        user.password !== ''
      ) {
        const data: { token: string } = await signUp({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
        });

        dispatch(addToken(data.token));
      }
    } else {
      if (user.email !== '' && user.password !== '') {
        const data: { token: string } = await signIn({
          email: user.email,
          password: user.password,
        });

        dispatch(addToken(data.token));
      }
    }

    setShowModal(false);
  };

  return (
    <div className='rounded-t-lg bg-gradient-to-b from-emerald-800 p-4'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center justify-start gap-2 md:hidden'>
          <Link
            href='/'
            className={`flex items-center justify-center rounded-full p-2 transition-all delay-100 ease-linear hover:scale-105 ${
              pathname === '/' ? 'bg-black text-white' : 'text-gray-300'
            }`}
          >
            <HiHome size={25} />
          </Link>
          <Link
            href='/search'
            className={`flex items-center justify-center rounded-full p-2 transition-all delay-100 ease-linear hover:scale-105 ${
              pathname === '/search' ? 'bg-black text-white' : 'text-gray-300'
            }`}
          >
            <BiSearch size={25} />
          </Link>
        </div>
        <div className='hidden items-center justify-start gap-2 md:flex'>
          <button
            className='flex items-center justify-center rounded-full bg-black p-1 transition-all delay-100 ease-linear hover:scale-105'
            onClick={() => router.back()}
          >
            <RxCaretLeft size={30} />
          </button>
          <button
            className='flex items-center justify-center rounded-full bg-black p-1 transition-all delay-100 ease-linear hover:scale-105'
            onClick={() => router.forward()}
          >
            <RxCaretRight size={30} />
          </button>
        </div>
        <div className='relative flex w-1/2 items-center justify-end gap-4 md:w-1/4'>
          {token ? (
            <Profile />
          ) : (
            <>
              <button
                className='px-4 py-2 font-bold text-white transition-all delay-100 ease-linear hover:scale-105'
                onClick={() => setShowModal((prev) => !prev)}
              >
                Sign Up
              </button>
              <button
                className='rounded-full bg-white px-4 py-2 font-bold text-black transition-all delay-100 ease-linear hover:scale-105'
                onClick={() => setShowModal((prev) => !prev)}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
      <>{children}</>
      {showModal && (
        <Modal setShowModal={() => setShowModal((prev) => !prev)}>
          {!isSignIn ? (
            <Auth
              heading='Sign up to your account'
              inputs={signUpInputs}
              isSignIn={isSignIn}
              setSignIn={() => setSignIn((prev) => !prev)}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            >
              Google Auth
            </Auth>
          ) : (
            <Auth
              heading='Sign in to your account'
              inputs={signInInputs}
              isSignIn={isSignIn}
              setSignIn={() => setSignIn((prev) => !prev)}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            >
              Google Auth
            </Auth>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Header;
