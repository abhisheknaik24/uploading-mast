import { cn } from '@/lib/utils';
import { Dancing_Script } from 'next/font/google';
import { memo } from 'react';

const font = Dancing_Script({ subsets: ['latin'] });

const Logo = () => {
  return (
    <div className='flex h-12 w-full items-center justify-start text-2xl text-emerald-300 xl:text-3xl'>
      <h1 className={cn('truncate', font.className)}>Uploading Mast</h1>
    </div>
  );
};

export default memo(Logo);
