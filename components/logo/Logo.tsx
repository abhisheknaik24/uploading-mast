import { Dancing_Script } from 'next/font/google';

const font = Dancing_Script({ subsets: ['latin'] });

const Logo = () => {
  return (
    <div className='flex h-12 w-full items-center justify-center text-2xl text-emerald-300 xl:text-3xl'>
      <h1 className={font.className}>Uploading Mast</h1>
    </div>
  );
};

export default Logo;
