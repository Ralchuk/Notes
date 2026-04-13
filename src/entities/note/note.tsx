import  Form from '@/entities/note/form';
import { type Note } from './model/types';
import { useState } from 'react';

export default function Note(){
    const [isOpen, setIsOpen] = useState(false)
    const [note, setNote] = useState<Note[]>([]);
      // const [open, setOpen] = useState(false);

    function onCreate(title: string, content: string) {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date(),
    };

    setNote((prev) => [newNote, ...prev]);
    setIsOpen(false);
  }
    function onClean(){
      setNote([])
    }
    return (
      <div className='flex flex-col items-center'>
        <div className='flex flex-col  pt-[10px] pb-[30px] gap-[15px] w-fit'>
          <div className='flex flex-row gap-[15px]'>
            <button className='flex uppercase px-6 py-2 text-white bg-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium transition-all duration-200
    hover:bg-white hover: border-[#1976d3] hover: border-[1px] hover:text-[#1976d3] cursor-pointer' onClick={() => setIsOpen(true)}>Create</button>
            <button className='flex uppercase px-6 py-2 text-[#1976d3] bg-white border-[1px] border-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium transition-all duration-200 hover:border-[#1976d3]/50 hover:text-[#1976d3]/50 cursor-pointer' onClick={onClean}>Clear</button>
          </div>
          {isOpen ?
          <div className='flex flex-col gap-[10px] w-full'>
            <button className='flex justify-end text-[#1976d3] cursor-pointer' onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <Form onCreate={onCreate} /> 
          </div>
            
            : null
          }
        </div>
        <div className='flex flex-col gap-[20px] px-[20px] w-full'>
          {note.length !== 0 ? note.map((item) => (
            <div className='border-y-[1px] border-[#1976d3]/50' key ={item.id}>
              <h1 className='text-[#1976d3] text-[32px] font-[Roboto, sans-serif]'>{item.title}</h1>
              <h2 className='text-black/50 text-[16px] font-[Roboto, sans-serif]'>{item.content}</h2>
              <h3 className='text-black/25 text-[12px] font-[Roboto, sans-serif] font-bold text-end'>{item.createdAt.toLocaleString()}</h3>
            </div>
          )) : <div className='flex flex-col items-center opacity-50' >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                    stroke="black"
                    strokeWidth="1.5"
                  />
                  <path d="M9 12h6M9 16h4" stroke="black" strokeWidth="1.5" />
                </svg>
                <p>No notes yet</p>
                <small>Click "Create" to add your first note</small>
              </div> }
        </div>
      </div>
          
    )
}