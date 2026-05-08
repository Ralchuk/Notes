import { createPortal } from 'react-dom';

const portalBg = 'flex fixed inset-0 bg-black/50 justify-center items-center';
const portalWrapper = 'flex flex-col gap-[40px] bg-white px-[40px] py-[40px]  uppercase rounded-[15px] overflow-hidden ';

type ModalProp = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalWrapper = ({children, onClose}: ModalProp) => {

  const modal = document.getElementById('modal');

  if(!modal) return null;

  return createPortal (
    <div
      className={portalBg}
      onClick={onClose}>
      <div
        className={portalWrapper}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modal
  );
};

export default ModalWrapper;

