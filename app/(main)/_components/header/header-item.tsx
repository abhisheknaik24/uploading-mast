'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

interface HeaderItemProps {
  href: string;
  icon: LucideIcon;
}

const HeaderItem = ({ href, icon: Icon }: HeaderItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'h-10 w-10 flex items-center justify-center rounded-full transition-all delay-100 ease-linear hover:scale-105',
        isActive ? 'bg-black text-white' : 'text-gray-300'
      )}
    >
      <Icon size={20} strokeWidth={3} />
    </Link>
  );
};

export default memo(HeaderItem);
