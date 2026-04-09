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
      createdAt: Date.now(),
    };

    setNote((prev) => [newNote, ...prev]);
    setIsOpen(false);
  }
    return (
      <div>
        <div>
            <button onClick={() => setIsOpen(true)}>Create</button>
            <button>Clear</button>
            {isOpen ?
            <div>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <Form onCreate={onCreate} /> 
              
            </div>
             
             : null
            }
        </div>
        <div>
          {note.length !== 0 ? note.map((item) => (
            <div key ={item.id}>
              <h1>{item.title}</h1>
              <h2>{item.content}</h2>
            </div>
          )) : <div style={{ textAlign: "center", marginTop: 40, opacity: 0.7 }}>
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