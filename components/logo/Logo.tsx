import Image from 'next/image';

const Logo = () => {
  return (
    <div className='relative h-12 w-full'>
      <Image
        src='https://images.unsplash.com/photo-1682687221323-6ce2dbc803ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
        alt='logo'
        className='object-cover'
        fill
      />
    </div>
  );
};

export default Logo;
