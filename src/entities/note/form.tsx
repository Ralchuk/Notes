import { useState } from 'react';

type Prop = {
  onCreate: (title: string, text: string) => void;
};


export default function Form ( {onCreate}: Prop) {
    const [title,setTitle] = useState('');
    const [text, setText] = useState('');
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();

        if (!title.trim() || !text.trim()) return;

        onCreate(title,text);
        setText('');
        setTitle('');
    }
    return (
        <div >
            <form 
                className="flex flex-col gap-[10px]"
                onSubmit={handleSubmit}>
                <input 
                    className="px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none focus:border-[#1976d3] font-[Roboto, sans-serif]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}>
                </input>
                <textarea
                    className="px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none resize-none focus:border-[#1976d3] font-[Roboto, sans-serif]"
                    value={text}
                    onChange={(e) => setText(e.target.value)}>
                </textarea>
                <button className='flex self-center uppercase px-6 py-2 text-white bg-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium w-fit transition-all duration-200
    hover:bg-white hover: border-[#1976d3] hover: border-[1px] hover:text-[#1976d3] cursor-pointer' type="submit">Save</button>
            </form>
        </div>

    )
}