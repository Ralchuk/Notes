import { type PropForm } from './model/types';

const formWrapper = 'flex flex-col gap-[10px] w-[fit]';
const formTitle = 'px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none focus:border-[#1976d3] font-[Roboto, sans-serif]';
const formText = 'h-[] px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none resize-none focus:border-[#1976d3] font-[Roboto, sans-serif]';

export default function Form({title, text, setTitle, setText, onSubmit}: PropForm ) {
  return (
    <div >
      <form 
        className={formWrapper}
        id="note-form"
        onSubmit={onSubmit}>
        <input 
          className={formTitle}
          placeholder='Enter note title...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}>
        </input>
        <textarea
          rows={4}
          className={formText}
          placeholder='Write your note here...'
          value={text}
          onChange={(e) => setText(e.target.value)}>
        </textarea>
      </form>
    </div>

  );
}
