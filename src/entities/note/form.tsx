import { useState } from "react"

type Prop = {
  onCreate: (title: string, text: string) => void;
};


export default function Form ( {onCreate}: Prop) {
    const [title,setTitle] = useState('');
    const [text, setText] = useState('');
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault,
        onCreate(title,text),
        setText(''),
        setTitle('')
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}>
                </input>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}>
                </textarea>
                <button type="submit">Save</button>
            </form>
        </div>

    )
}