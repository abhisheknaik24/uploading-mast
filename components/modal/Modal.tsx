import { IoCloseOutline } from 'react-icons/io5';
import Button from '../button/Button';

interface ModalProps {
  children: React.ReactNode;
  setShowModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Modal: React.FC<ModalProps> = ({ children, setShowModal }) => {
  return (
    <div className='relative z-50'>
      <div className='fixed inset-0 bg-neutral-800/50' />
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-screen items-center justify-center p-4'>
          <div className='relative w-full transform overflow-hidden rounded-md bg-neutral-900 p-6 text-white shadow-xl transition-all delay-100 ease-linear lg:w-1/2'>
            <div className='flex items-center justify-end'>
              <Button type='button' onClick={setShowModal}>
                <IoCloseOutline size={25} />
              </Button>
            </div>
            <div className='flex flex-col items-start justify-start'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
