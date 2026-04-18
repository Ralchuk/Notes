import  Form from '@/entities/note/form';
import ContextMenu from './contextMenu';
import { type Note } from './model/types';
import { useState, useEffect, useRef } from 'react';

const container = 'flex flex-col items-center w-full min-h-screen';
const noteContainer = 'flex flex-col  pt-[10px] pb-[30px] gap-[15px] w-fit';
const headerNote = 'flex flex-col items-center gap-[15px] w-[350px]';
const headerNoteBtn = 'flex flex-row gap-[10px]';
const btnCreate = 'flex uppercase px-6 py-2 text-white bg-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium transition-all duration-200 hover:bg-white hover: border-[#1976d3] hover: border-[1px] hover:text-[#1976d3] cursor-pointer';
const btnClear = 'flex uppercase px-6 py-2 text-[#1976d3] bg-white border-[1px] border-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium transition-all duration-200 hover:border-[#1976d3]/50 hover:text-[#1976d3]/50 cursor-pointer';
const formContainer = 'flex flex-col gap-[10px] w-full';
const btnClose = 'flex self-center uppercase px-6 py-2 text-white bg-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium w-fit transition-all duration-200 hover:bg-white hover: border-[#1976d3] hover: border-[1px] hover:text-[#1976d3] cursor-pointer';
const arrContainer = 'flex flex-col gap-[20px] px-[20px] w-full';
const itemNote = 'border-y-[1px] border-[#1976d3]/50';
const itemNoteTitle = 'text-[#1976d3] text-[32px] font-[Roboto, sans-serif]';
const itemNoteContent = 'text-black/50 text-[16px] font-[Roboto, sans-serif]';
const itemNoteDate = 'text-black/25 text-[12px] font-[Roboto, sans-serif] font-bold text-end';
const arrEmpty = 'flex flex-col items-center opacity-50';

export default function Note(){
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState<Note[]>([]);
  const [title,setTitle] = useState('');
  const [text, setText] = useState('');

  // states for contextMenu
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [coord, setCoord] = useState<{x:number, y: number} | null>(null)
  const [noteItem, setNoteItem] = useState<Note | null>(null)

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

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault();

    if (!title.trim() || !text.trim()) return;

    onCreate(title,text);
    setText('');
    setTitle('');
  }

  function handleCleanNotes(){
    setNote([]);
  }

  function handleClearForm(){
    setText('');
    setTitle('');
  }

  // Контекстне меню
  function onContextMenu(e: React.MouseEvent<HTMLDivElement>, item: Note){
    e.preventDefault();
    setIsOpenMenu(true);
    setCoord({x: e.clientX, y: e.clientY})
    setNoteItem(item)
    console.log(item)
  }

  // Закриття контекстного меню
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpenMenu) return;

    function onCloseMenu (e: MouseEvent){
      if(menuRef.current && !menuRef.current.contains(e.target as Node)){
        setIsOpenMenu(false)
      }
    }

    document.addEventListener('click', onCloseMenu)

    return () => {
      document.removeEventListener('click', onCloseMenu)
    };

  }, [isOpenMenu]
  )


  return (
    <div className={container}>
      <div className={noteContainer}>
        {isOpen ?
          <div className={headerNote}>
            <div className={headerNoteBtn}>
              <button className={btnCreate} type='submit' form="note-form">Save</button>
              <button className={btnClear} onClick={handleClearForm}>Clear</button>
            </div>
            <div className={formContainer}>
              <Form title={title} text={text} setTitle={setTitle} setText={setText} onSubmit={handleSubmit} /> 
              <button className={btnClose} onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </div>
          : 
          <div className={headerNote}>
            <div className={headerNoteBtn}>
              <button className={btnCreate} onClick={() => setIsOpen(true)}>Create</button>
              <button className={btnClear} onClick={handleCleanNotes}>Clear</button>
            </div>
          </div>
        }
      </div>
      <div className={arrContainer}>
        {note.length !== 0 ? note.map((item) => (
          <div className={itemNote} key ={item.id} onContextMenu={(e) => onContextMenu(e, item)}>
            
            
            <h1 className={itemNoteTitle}>{item.title}</h1>
            <h2 className={itemNoteContent}>{item.content}</h2>
            <h3 className={itemNoteDate}>{item.createdAt.toLocaleString()}</h3>
          </div>
        ))
        

        : <div className={arrEmpty} >
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
        {isOpenMenu && coord ? <ContextMenu x={coord.x} y={coord.y} menuRef={menuRef}/> : null}
      </div>
    </div>
  );
}
