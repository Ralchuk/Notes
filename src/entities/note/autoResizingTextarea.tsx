import { forwardRef, useRef, useImperativeHandle } from 'react';
import { type PropResizingTextarea } from './model/types';
import { type AutoResizeTextareaHandle } from './model/types';



const formText = 'w-full px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none resize-none overflow-hidden focus:border-[#1976d3] font-[Roboto, sans-serif] placeholder:text-gray-400 focus:placeholder-transparent';

const AutoResizingTextArea = forwardRef<AutoResizeTextareaHandle, PropResizingTextarea>(({text, setText, errorTextArea}, ref) => {
	const refTextarea= useRef<HTMLTextAreaElement | null>(null);

	useImperativeHandle(ref, () => ({
		resetAndFocus:
		() => {
			refTextarea.current?.focus();
			setText('');
		}
	}));
	

	function handleResize(){
		const el = refTextarea.current;
		if(!el) return;

		el.style.height = 'auto';
		el.style.height = el.scrollHeight + 'px';
	}
	return (
		<div>
			{errorTextArea && <p className='text-red-700 italic lowercase text-[12px]'>{errorTextArea}</p>}
			<textarea 
				ref ={refTextarea}
				rows={4}
				className={formText}
				placeholder='Write your note here...'
				name='textarea'
				value={text}
				onChange={(e) => {
					setText(e.target.value);
					handleResize();
				}}
			/>
			
		</div>
	);
});

export default AutoResizingTextArea; 
