import Panel from '@/components/panel/Panel';
import Sidebar from '@/components/sidebar/Sidebar';
import Providers from '@/redux/Providers';
import '@/styles/globals.css';
import { Figtree } from 'next/font/google';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Uploading Mast',
  description: 'Uploading Mast',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`flex h-screen w-full items-start justify-start gap-4 overflow-hidden bg-black p-2 text-white ${font.className}`}
      >
        <Providers>
          <Sidebar />
          {children}
          <Panel />
        </Providers>
      </body>
    </html>
  );
}
