import {useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';


const PortalWrapper = ({text, children}: {text: string, children: ReactNode}) => {
  const[open, setOpen] = useState(false);

  const modal = document.getElementById('modal');

  if (!modal) return null;

  function onHover(){
    setOpen(true);
  };

  function onLeave(){
    setOpen(false);
  };
  
  return createPortal (
    <div
      className='flex justify-self-center w-fit position: relative'
      onMouseEnter={onHover}
      onMouseLeave={onLeave}>
      {children}
      {open &&  <p
        className='flex whitespace-nowrap position: absolute px-6 py-2 text-white bg-[#1976d3] rounded-[2px] font-[Roboto, sans-serif] font-light top-[100%] -left-6'
      >{text}
      </p>
      }
      {!open && null}
    </div>,
    modal
  );
};

export default function AppLab(){
  return (
    <PortalWrapper text='Tooltip on bottom'>
      <div className='flex'>Trigger-element</div>
    </PortalWrapper>
  );
}
