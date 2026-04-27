import { forwardRef, useRef, useImperativeHandle } from "react";
import { type PropResizingTextarea } from './model/types';
import { type AutoResizeTextareaHandle } from './model/types';



const formText = 'w-full px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none resize-none focus:border-[#1976d3] font-[Roboto, sans-serif] placeholder:italic focus:placeholder-transparent';

const AutoResizingTextArea = forwardRef<AutoResizeTextareaHandle, PropResizingTextarea>(({text, setText}, ref) => {
    const refTextarea= useRef<HTMLTextAreaElement | null>(null)

    useImperativeHandle(ref, () => ({
       resetAndFocus:
       () => {
            setText('');
            refTextarea.current?.focus()
       }
    }))
    

    function handleResize(){
        const el = refTextarea.current;
        if(!el) return;

        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }
    return (
        <div>
                <textarea 
                    ref ={refTextarea}
                    rows={4}
                    className={formText}
                    placeholder='Write your note here...'
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        handleResize()
                    }}
                >
                </textarea>
        </div>
    )
})

export default AutoResizingTextArea; 