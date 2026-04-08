import  FormNote  from '@/entities/note/form2';
import { type Note } from './model/types';
import { useState } from 'react';

export default function Note2(){
    const [isOpen, setIsOpen] = useState(false)
    const [note, setNote] = useState<Note[]>([]);
      const [open, setOpen] = useState(false);

    function onCreate(title: string, content: string) {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: Date.now(),
    };

    setNote((prev) => [newNote, ...prev]);
    setOpen(false);
  }
    return (
        <div>
            <button onClick={() => setIsOpen(prev => !prev)}>Create</button>
            {isOpen ? <FormNote onCreate={onCreate} /> : null
            }
            <button>Clear</button>
        </div>
    )
}