import dynamic from 'next/dynamic';
import Header from './_components/header/header';
import Sidebar from './_components/sidebar/sidebar';

const Player = dynamic(() => import('@/app/(main)/_components/player/player'), {
  ssr: false,
});

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Sidebar />
      <div className='h-full w-full overflow-y-auto rounded-t-lg bg-gradient-to-b from-emerald-800 p-4 scrollbar-hide'>
        <Header />
        {children}
      </div>
      <Player />
    </>
  );
};

export default MainLayout;
