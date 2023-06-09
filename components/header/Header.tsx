'use client';

import { signIn } from '@/actions/signIn';
import { signUp } from '@/actions/signUp';
import { validateEmail } from '@/actions/validateEmail';
import { RootState } from '@/redux/store';
import { addToken } from '@/redux/user/userSlice';
import { IInput, IResponse, IUser } from '@/types/types';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../auth/Auth';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import Profile from '../profile/Profile';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const dispatch = useDispatch();

  const pathname = usePathname();

  const router = useRouter();

  const token: string | null = useSelector(
    (state: RootState) => state.user.token
  );

  const [isSignIn, setSignIn] = useState<boolean>(true);

  const [isSentOTP, setSentOTP] = useState<boolean>(false);

  const [signUpEmail, setSignUpEmail] = useState<string>('');

  const [user, setUser] = useState<IUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [oTP, setOTP] = useState<number>(0);

  const [showModal, setShowModal] = useState<boolean>(false);

  const signInInputs: IInput[] = [
    { label: 'Email Address', type: 'email', id: 'email', name: 'email' },
    { label: 'Password', type: 'password', id: 'password', name: 'password' },
  ];

  const signUpInputs: IInput[] = [
    { label: 'First Name', type: 'text', id: 'firstName', name: 'firstName' },
    { label: 'Last Name', type: 'text', id: 'lastName', name: 'lastName' },
    { label: 'Email Address', type: 'email', id: 'email', name: 'email' },
    { label: 'Password', type: 'password', id: 'password', name: 'password' },
  ];

  const otpInputs: IInput[] = [
    { label: 'OTP', type: 'number', id: 'otp', name: 'otp' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSentOTP) {
      setOTP(Number(e.target.value));
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSignIn && !isSentOTP) {
      if (
        user.firstName !== '' &&
        user.lastName !== '' &&
        user.email !== '' &&
        user.password !== ''
      ) {
        const data: IResponse = await signUp({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        });

        if (data.success && data.data.email) {
          setSignUpEmail(data.data.email);

          setSentOTP(true);
        }
      }
    } else if (isSignIn && !isSentOTP) {
      if (user.email !== '' && user.password !== '') {
        const data: IResponse = await signIn({
          email: user.email,
          password: user.password,
        });

        if (data.success && data.data.token) {
          dispatch(addToken(data.data.token));

          setShowModal(false);
        }
      }
    } else if (isSentOTP) {
      if (oTP !== 0 && signUpEmail !== '') {
        const data: IResponse = await validateEmail({
          email: signUpEmail,
          otp: oTP,
        });

        if (data.success) {
          dispatch(addToken(data.data.token));

          setSentOTP(false);

          setShowModal(false);
        }
      }
    } else {
      setShowModal(false);
    }
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
          <Button
            type='button'
            className='flex items-center justify-center rounded-full bg-black p-1 transition-all delay-100 ease-linear hover:scale-105'
            onClick={() => router.back()}
          >
            <RxCaretLeft size={30} />
          </Button>
          <Button
            type='button'
            className='flex items-center justify-center rounded-full bg-black p-1 transition-all delay-100 ease-linear hover:scale-105'
            onClick={() => router.forward()}
          >
            <RxCaretRight size={30} />
          </Button>
        </div>
        <div className='relative flex w-1/2 items-center justify-end gap-4 md:w-1/4'>
          {token ? (
            <Profile />
          ) : (
            <>
              <Button
                type='button'
                className='px-4 py-2 font-bold text-white transition-all delay-100 ease-linear hover:scale-105'
                onClick={() => {
                  setShowModal((prev) => !prev);
                  setSignIn(false);
                }}
              >
                Sign Up
              </Button>
              <Button
                type='button'
                className='rounded-full bg-white px-4 py-2 font-bold text-black transition-all delay-100 ease-linear hover:scale-105'
                onClick={() => {
                  setShowModal((prev) => !prev);
                  setSignIn(true);
                }}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>
      <div>{children}</div>
      {showModal && (
        <Modal setShowModal={() => setShowModal((prev) => !prev)}>
          {!isSignIn && !isSentOTP && (
            <Auth
              heading='Sign up to your account'
              inputs={signUpInputs}
              isSignIn={isSignIn}
              isSentOTP={isSentOTP}
              setSignIn={() => setSignIn((prev) => !prev)}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          )}
          {isSignIn && !isSentOTP && (
            <Auth
              heading='Sign in to your account'
              inputs={signInInputs}
              isSignIn={isSignIn}
              isSentOTP={isSentOTP}
              setSignIn={() => setSignIn((prev) => !prev)}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          )}
          {isSentOTP && (
            <Auth
              heading='Enter a verification code'
              inputs={otpInputs}
              isSignIn={isSignIn}
              isSentOTP={isSentOTP}
              setSignIn={() => setSignIn((prev) => !prev)}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Header;
