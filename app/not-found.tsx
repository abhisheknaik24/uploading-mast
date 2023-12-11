import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='h-full w-full flex items-center justify-center bg-black z-50'>
      <div className='flex flex-col items-center justify-center gap-4 bg-secondary/50 border border-secondary p-24 rounded-md'>
        <h3 className='mb-4 text-5xl text-rose-500 font-bold capitalize'>
          Page Not Found
        </h3>
        <Link
          href='/'
          className='bg-secondary px-4 py-2 rounded-md hover:bg-secondary/80'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
