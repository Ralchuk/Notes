import { type PropForm} from './model/types';
import AutoResizingTextArea from './autoResizingTextarea';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useEffect } from 'react';

const formWrapper = 'flex flex-col gap-[10px] w-[fit] dark:text-white';
const formTitle = 'flex w-[500px] px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none focus:border-[#1976d3] font-[Roboto, sans-serif] placeholder:text-gray-400 focus:placeholder-transparent';
const btnCreate =
	'flex w-[100px] h-[40px] justify-center items-center uppercase text-white bg-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium transition-all duration-200 hover:bg-[#1976d3]/85 focus:bg-[#1976d3] hover: border-[1px] hover:text-white cursor-pointer dark:hover:bg-[#07151e]';
const btnClear =
	'flex w-[100px] h-[40px] justify-center items-center uppercase  text-[#1976d3] bg-white border-[1px] border-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium transition-all duration-200 hover:border-[#1976d3]/50 hover:text-[#1976d3]/50 cursor-pointer dark:bg-[#07151e]';


interface addNoteType{
	success: boolean;
	message: string;
	error?: {
		title?: string,
		textArea?: string
	};
};

const initialNote: addNoteType ={
	success: false,
	message: '',
};

async function handleRegistrationForm(prevStateNote: addNoteType, formDataNote: FormData): Promise<addNoteType>{
	const titleNote = formDataNote.get('title') as string;
	const textAreaNote = formDataNote.get('textarea') as string;
	await new Promise(result => setTimeout(result, 1000));
	switch(true){
	case(titleNote.length === 0 && textAreaNote.length === 0):
		return {
			success: false,
			message: 'Cannot add new note',
			error: {
				title: 'Field title is empty',
				textArea: 'Field textarea is empty'
			}
		};
	case(titleNote.length === 0):
		return {
			success: false,
			message: 'Cannot add new note',
			error: {
				title: 'Field title is empty'
			}
		};
	case(textAreaNote.length === 0):
		return {
			success: false,
			message: 'Cannot add new note',
			error: {
				textArea: 'Field textarea is empty'
			}
		};
	default: 
		return{
			success: true,
			message: 'Add new note'
		};
	}
	
};

function HandlePendingForm(){
	const{pending}=useFormStatus();
	return(
		<button
			className={btnCreate}
			type='submit'
			disabled={pending}>
			{pending ? <div className='w-[24px] h-[24px] border-[2px] border-white rounded-[50%] border-y-transparent animate-spin'></div> : <div >Create</div>}
		</button>
	);
};



export default function Form({title, text, setTitle, setText, onSubmit, auto, handleClearForm}: PropForm ) {
	const[state, actionState] = useActionState(handleRegistrationForm, initialNote);
	useEffect(()=>{
		if(state.success){
			 onSubmit();
		}
	},[state.success, onSubmit]);
	return (
		<div >
			<form 
				className={formWrapper}
				id="note-form"
				action={actionState}>
				{state.message && (
					<p className={state.success ? 'text-green-700' : 'text-red-700'}>{state.message}!</p>
				)}
				<div>
					{state.error?.title && <p className='text-red-700 italic lowercase text-[12px]'>{state.error.title}</p>}
					<input 
						className={formTitle}
						placeholder='Enter note title...'
						name='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<AutoResizingTextArea text={text} setText={setText} errorTextArea={state.error?.textArea} ref={auto}/>
				<div
					className='flex justify-center gap-[10px]'>
					<HandlePendingForm/>
					<button
						className={btnClear}
						onClick={handleClearForm}
					>
						Clear
					</button>
				</div>
				
			</form>
		</div>

	);
}
