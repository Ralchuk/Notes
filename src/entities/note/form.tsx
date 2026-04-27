import { type PropForm} from './model/types';
import AutoResizingTextArea from './autoResizingTextarea';

const formWrapper = 'flex flex-col gap-[10px] w-[fit]';
const formTitle = 'px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none focus:border-[#1976d3] font-[Roboto, sans-serif] placeholder:italic focus:placeholder-transparent';

export default function Form({title, text, setTitle, setText, onSubmit, auto}: PropForm ) {
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
        <AutoResizingTextArea text={text} setText={setText} ref={auto}/>
      </form>
    </div>

  );
}
