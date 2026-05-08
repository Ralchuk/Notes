import { createPortal } from 'react-dom';

type ModalProp = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalWrapper = ({children, onClose}: ModalProp) => {

  const modal = document.getElementById('modal');

  if(!modal) return null;

  return createPortal (
    <div
      className='flex fixed inset-0 bg-black/50 justify-center items-center'
      onClick={onClose}>
      <div
        className='flex flex-col gap-[40px] bg-white px-[20px] py-[40px]  uppercase '
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modal
  );
};

export default ModalWrapper;

