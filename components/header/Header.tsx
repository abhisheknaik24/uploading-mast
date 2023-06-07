'use client';

import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const pathname = usePathname();

  const router = useRouter();

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
        <div className='flex items-center justify-between gap-2'>
          <button className='px-4 py-2 font-bold text-white transition-all delay-100 ease-linear hover:scale-105'>
            Sign Up
          </button>
          <button className='rounded-full bg-white px-4 py-2 font-bold text-black transition-all delay-100 ease-linear hover:scale-105'>
            Sign In
          </button>
        </div>
      </div>
      <>{children}</>
    </div>
  );
};

export default Header;
