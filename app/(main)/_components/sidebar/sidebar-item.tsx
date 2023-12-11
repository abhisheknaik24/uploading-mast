'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarItem = ({ href, icon: Icon, label }: SidebarItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-start gap-4 transition-all delay-100 ease-linear hover:scale-105 hover:text-white',
        isActive ? 'text-white' : 'text-neutral-400'
      )}
    >
      <Icon size={20} />
      <h3 className='font-medium'>{label}</h3>
    </Link>
  );
};

export default memo(SidebarItem);
