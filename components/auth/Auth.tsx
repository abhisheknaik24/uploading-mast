import { IInput } from '@/types/types';
import Input from '../input/Input';
import Button from '../button/Button';

interface AuthProps {
  children: React.ReactNode;
  heading: string;
  inputs: IInput[];
  isSignIn: boolean;
  setSignIn: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Auth: React.FC<AuthProps> = ({
  children,
  heading,
  inputs,
  isSignIn,
  setSignIn,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden p-2 md:px-6 md:py-4'>
      <div>
        <h1 className='text-4xl font-bold'>{heading}</h1>
      </div>
      <div className='flex w-full flex-col items-start justify-start gap-6 rounded-md bg-neutral-800 p-4 shadow-md md:px-6 md:py-4'>
        <div>{children}</div>
        <div className='w-full border-t border-neutral-300' />
        <form
          className='flex w-full flex-col items-start justify-start gap-8'
          onSubmit={handleSubmit}
        >
          <div className='flex w-full flex-col items-start justify-start gap-4'>
            {inputs &&
              inputs.map((i, index) => (
                <div key={index} className='w-full'>
                  <Input
                    label={i.label}
                    type={i.type}
                    className='mt-2 h-10'
                    id={i.id}
                    name={i.name}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
          </div>
          <div className='flex w-full flex-col items-start justify-start gap-4'>
            {!isSignIn ? (
              <>
                <Button
                  type='submit'
                  className='w-full cursor-pointer rounded-md bg-emerald-700/50 py-2 font-semibold text-white shadow-sm hover:bg-emerald-700'
                >
                  Sign Up
                </Button>
                <Button
                  type='button'
                  className='w-full cursor-pointer rounded-md border border-emerald-700/50 py-2 font-semibold text-emerald-500 shadow-sm hover:border-emerald-700 hover:bg-emerald-700/10'
                  onClick={setSignIn}
                >
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <Button
                  type='submit'
                  className='w-full cursor-pointer rounded-md bg-emerald-700/50 py-2 font-semibold text-white shadow-sm hover:bg-emerald-700'
                >
                  Sign In
                </Button>
                <Button
                  type='button'
                  className='w-full cursor-pointer rounded-md border border-emerald-700/50 py-2 font-semibold text-emerald-500 shadow-sm hover:border-emerald-700 hover:bg-emerald-700/10'
                  onClick={setSignIn}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
