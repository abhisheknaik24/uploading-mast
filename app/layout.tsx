import { ModalProvider } from '@/components/providers/modal-provider';
import QueryProvider from '@/components/providers/query-provider';
import { ToasterProvider } from '@/components/providers/toaster-provider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Figtree } from 'next/font/google';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Uploading Mast',
  description: 'Uploading Mast is a music web player',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en'>
      <body
        className={cn(
          'mx-auto flex h-screen w-full max-w-screen-2xl items-start justify-start gap-4 overflow-hidden bg-black p-2 text-white',
          font.className
        )}
      >
        <QueryProvider>
          {children}
          <ModalProvider />
          <ToasterProvider />
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
