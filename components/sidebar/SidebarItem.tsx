import Link from 'next/link';
import { IconType } from 'react-icons';

interface SidebarItemProps {
  children: React.ReactNode;
  href: string;
  icon: IconType;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  children,
  href,
  icon: Icon,
  active,
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center justify-start gap-4 transition-all delay-100 ease-linear hover:scale-105 hover:text-white ${
        active ? 'text-white' : 'text-neutral-400'
      }`}
    >
      <Icon size={25} />
      <h3 className='font-medium'>{children}</h3>
    </Link>
  );
};

export default SidebarItem;
