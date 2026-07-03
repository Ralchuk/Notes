import Form from '@/entities/note/form';
import ContextMenu from './contextMenu';
import Sidebar from './sidebar';
import ModalWrapper from './modalForm';
import UserProfileWrapper from './userProfileWrapper';
import UserProfileForm from './userProfile';
import { NoteContextDispatch, NoteContextState } from './theme';
import Empty_note from '../../../img/undraw_add-notes_9xls.svg';
import { useReduceNote, useReduceNoteForm, useReduceProfile } from '../../../store/storeReducerNote';
import {
	type Note,
	type MenuAction,
	type MenuState,
	type AutoResizeTextareaHandle,
} from './model/types';
import { useEffect, useRef, useReducer, useContext, useCallback, useOptimistic} from 'react';
import useOnlineStatus from '../hooks/useOnlineStatus';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


// main classes
const container =
	'flex flex-col items-center content-center w-full  items-center h-screen bg-white dark:bg-[#07151e]';
const noteHeader =
	'flex flex-r justify-stretch w-full items-center pt-[30px] pb-[30px] px-[20px] gap-[15px] border-b border-[#1976d3]';
const noteBody = 'flex w-full flex-1 h-screen overflow-hidden';

// header
const headerNoteBtn = 'flex flex-row gap-[10px] w-full justify-center';
// const btnThemeWrapper = 'flex gap-[20px] cursor-pointer';
// const btnTheme = 'flex border-blue-500 border-[1px] px-[10px] py-[5px] cursor-pointer';
const btnCreate =
	'flex uppercase px-6 py-2 text-white bg-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium transition-all duration-200 hover:bg-white hover: border-[#1976d3] hover: border-[1px] hover:text-[#1976d3] cursor-pointer dark:hover:bg-[#07151e]';
const btnClear =
	'flex uppercase px-6 py-2 text-[#1976d3] bg-white border-[1px] border-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium transition-all duration-200 hover:border-[#1976d3]/50 hover:text-[#1976d3]/50 cursor-pointer dark:bg-[#07151e]';

// sidebar
const sidebarWrapper =
	'flex flex-col flex-1 gap-[50px] px-[20px] pt-[20px] w-full max-w-[600px]  border-r-[1px] border-[#1976d3]/50 mb-[30px] overflow-auto';
const arrEmpty = 'flex flex-col items-center justify-center opacity-50 h-full dark:text-white  gap-[20px]';
const arrEmptyText = 'font-[Roboto, sans-serif] font-medium text-[18px] absolute -bottom-10 left-1/2  -translate-x-1/2 whitespace-nowrap text-gray-500  dark:text-gray-100';
const Empty_note_round = 'flex w-[300px] h-[300px] rounded-full relative bg-gray-300 -z-1 ';
const arrEmptySvg ='grayscale absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';


// reducer для контекстного меню

const initialState: MenuState = {
	isOpenMenu: false,
	coord: null,
	noteItem: null,
};

function reducer(state: MenuState, action: MenuAction): MenuState {
	switch (action.type) {
	case 'OPEN_MENU':
		return {
			...state,
			isOpenMenu: true,
			coord: action.payload.coord,
			noteItem: action.payload.noteItem,
		};
	case 'HIDE_MENU':
		return {
			...state,
			isOpenMenu: false,
			coord: null,
		};
	case 'CLOSE_MENU':
		return {
			...state,
			isOpenMenu: false,
			coord: null,
			noteItem: null,
		};

	default:
		return state;
	}
};



const noteFetch = async() => {
	const response = await fetch('http://localhost:3000/notes');
	if(!response.ok)
		throw new Error('invalid note');
	return response.json();
};

const noteFetchSave = async(newNote: {title: string, content: string, status: 'inprogress' | 'completed', createdAt: Date}) => {
	const response = await fetch('http://localhost:3000/notes', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(newNote)
	});
	if(!response.ok)
		throw new Error('invalid note');
	return response.json();
};

const noteFetchEdit = async(id: string, editNote: {title: string, content: string }) => {
	const response = await fetch(`http://localhost:3000/notes/${id}`, {
		method: 'PATCH',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(editNote)
	});
	if(!response.ok)
		throw new Error('invalid note');
	return response.json();
};

const noteFetchStatus = async(id: string, editNote: {status: 'inprogress' | 'completed'}) => {
	const response = await fetch(`http://localhost:3000/notes/${id}`, {
		method: 'PATCH',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(editNote)
	});
	if(!response.ok)
		throw new Error('invalid note');
	return response.json();
};

const noteFetchDelete = async(id: string) => {
	const response = await fetch(`http://localhost:3000/notes/${id}`, {
		method: 'Delete',
		headers: {'Content-Type': 'application/json'},
	});
	if(!response.ok)
		throw new Error('invalid note');
	return response.json();
};


export default function Note() {

	const queryClient = useQueryClient();

	const {data, isPending, error} = useQuery({
		queryKey: ['notes'],
		queryFn:() => noteFetch()
	});

	

	const {mutate} = useMutation({
		mutationKey: ['new notes'],
		mutationFn:(newNote: {title: string, content: string, status: 'inprogress' | 'completed', createdAt: Date}) => noteFetchSave(newNote),
		onSuccess: () => {
    		queryClient.invalidateQueries({
      		queryKey: ['notes'], 
			});
		},
	});

	const {mutate: mutateEdit} = useMutation({
		mutationKey: ['edit notes'],
		mutationFn:({id, editNote}: {id: string, editNote:{title: string, content: string}}) => noteFetchEdit(id, editNote),
		onSuccess: () => {
    		queryClient.invalidateQueries({
      		queryKey: ['notes'], 
			});
		},
	});

	const {mutate: mutateStatus} = useMutation({
		mutationKey: ['edit notes status'],
		mutationFn:({id, editNote}: {id: string, editNote:{status: 'inprogress' | 'completed'}}) => noteFetchStatus(id, editNote),
		onSuccess: () => {
    		queryClient.invalidateQueries({
      		queryKey: ['notes'], 
			});
		},
	});

	const {mutate: mutateDelete} = useMutation({
		mutationKey: ['delete notes'],
		mutationFn:(id: string) => noteFetchDelete(id),
		onSuccess: () => {
    		queryClient.invalidateQueries({
      		queryKey: ['notes'], 
			});
		},
	});

	const {isOpenForm, title, text} = useReduceNoteForm();
	const {isOpenUserProfile} = useReduceProfile();
	const setIsOpenForm = useReduceNoteForm((state) => state.setIsOpenForm);
	const setIsCloseForm = useReduceNoteForm((state) => state.setIsCloseForm);
	const setIsOpenUserProfile = useReduceProfile((state) => state.setIsOpenUserProfile);
	const setIsCloseUserProfile = useReduceProfile((state) => state.setIsCloseUserProfile);

	const setTitle = useReduceNoteForm((state) => state.setTitle);
	const setText = useReduceNoteForm((state) => state.setText);

	const setStatusCompleted = useReduceNote((state) => state.setStatusCompleted);
	const setStatusInprogress = useReduceNote((state) => state.setStatusInprogress);

	const [optimisticNotes, setOptimisticNotes] = useOptimistic<Note[], Note>(data ?? [], ((prevNotes, nextNotes) => [...prevNotes, nextNotes]));

	const auto = useRef<AutoResizeTextareaHandle | null>(null);

	const [state, dispatch] = useReducer(reducer, initialState);

	const online = useOnlineStatus();

	

	// function onCreate() {
	// 	saveNote({text, title});
	// }


	function onCreate() {
		mutate({ title, content: text, status: 'inprogress', createdAt: new Date() });
	}

	function onCloseForm() {
		setIsCloseForm();
	}

	function onCloseUserProfile() {
		setIsCloseUserProfile();
	}

	function onOpenForm() {
		setIsOpenForm();
	}

	function onOpenUserProfile() {
		setIsOpenUserProfile();
	}

	function setTitleNote(value: string) {
		setTitle(value);
	}

	function setTextNote(value: string) {
		setText(value);
	}

	function handleSubmit() {
		if (!title.trim() || !text.trim()) return;
		
		setOptimisticNotes({
			id: Date.now().toString(),
			createdAt: new Date(),
			title: title,
			content: text,
			status: 'inprogress',
		});

		if (state.noteItem) {
			dispatch({ type: 'CLOSE_MENU' });
			mutateEdit({id: state.noteItem.id, editNote: {title, content: text}});
		} else {
			onCreate();
		}
		setIsCloseForm();
	}

	async function handleCleanNotes() {
		await Promise.all(data.map(note => noteFetchDelete(note.id)));
		queryClient.invalidateQueries({ queryKey: ['notes'] });
	}

	function handleClearForm() {
		setTitle('');
		setText('');
	}

	// Контекстне меню

	// function onContextMenu(e: React.MouseEvent<HTMLDivElement>, item: Note){e.preventDefault();
	// 	dispatch({
	// 		type: 'OPEN_MENU',
	// 		payload: {
	// 			coord: { x: e.clientX, y: e.clientY },
	// 			noteItem: item,
	// 		},
	// 	});
	// };


	const onContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement>, item: Note) => {e.preventDefault();
		dispatch({
			type: 'OPEN_MENU',
			payload: {
				coord: { x: e.clientX, y: e.clientY },
				noteItem: item,
			},
		});
	},[dispatch]);

	
	// function onEditNote() {
	// 	dispatch({ type: 'HIDE_MENU' });
	// 	dispatchNote({ type: 'OPEN_FORM' });
	// 	if (state.noteItem) {
	// 		dispatchNote({
	// 			type: 'SET_TITLE',
	// 			payload: state.noteItem?.title,
	// 		});
	// 		dispatchNote({
	// 			type: 'SET_TEXT',
	// 			payload: state.noteItem?.content,
	// 		});
	// 	}
	// }

	const onEditNote = useCallback(() => {
		dispatch({ type: 'HIDE_MENU' });
		setIsOpenForm();
		if (state.noteItem) {
			setTitle(state.noteItem.title);
			setText(state.noteItem.content);
		}
	}, [dispatch, setIsOpenForm, setTitle, setText, state.noteItem]);


	// function onDeleteNote(item: Note) {
	// 	dispatch({ type: 'CLOSE_MENU' });
	// 	dispatchNote({
	// 		type: 'DELETE_NOTE',
	// 		payload: { id: item.id },
	// 	});
	// };

	const onDeleteNote = useCallback((item: Note) => {
		dispatch({ type: 'CLOSE_MENU' });
		mutateDelete(item.id);
	},[dispatch, mutateDelete]);

	function onSetStatusCompleted(item: Note) {
		setStatusCompleted(item.id);
		mutateStatus({ id: item.id, editNote: { status: 'completed'}});
	}

	function onSetStatusInprogress(item: Note) {
		setStatusInprogress(item.id);
		mutateStatus({ id: item.id, editNote: { status: 'inprogress'}});
	}


	// Закриття контекстного меню
	const menuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!state.isOpenMenu) return;

		function onCloseMenu(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				console.log('Close menu');
				dispatch({ type: 'CLOSE_MENU' });
			}
		}

		document.addEventListener('click', onCloseMenu);

		return () => {
			document.removeEventListener('click', onCloseMenu);
		};
	}, [state.isOpenMenu]);


	const contextState = useContext(NoteContextState);
	const contextDispatch = useContext(NoteContextDispatch);
	const theme = contextState;
	const setTheme = contextDispatch;

	useEffect(() => {
		console.log('theme:', theme);
		if(theme === 'dark'){
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	},[theme]);
	
	if(contextState === null || contextDispatch === null) return;

	function handleChange(){
		if(setTheme ===null )return;
		setTheme(theme === 'light' ? 'dark' : 'light');
	}

	if(isPending) {
		return <div>Loading notes...</div>;
	}
	if(error){
		return <div>Error server{error.message}</div>;
	}
	
	return (
		<> 
			{isOpenForm && <title>{title}</title>}
			<div className={container}>
				{isOpenForm && (
					<ModalWrapper onClose={onCloseForm}>
						<h2 className='text-[32px] text-[#1976d3] font-[Roboto, sans-serif] font-medium'>
							Create note
						</h2>
						<Form
							title={title}
							text={text}
							setTitle={setTitleNote}
							setText={setTextNote}
							onSubmit={handleSubmit}
							auto={auto}
							handleClearForm={handleClearForm}

						/>
					</ModalWrapper>
				)}
				{isOpenUserProfile && (
					<UserProfileWrapper onClose={onCloseUserProfile}>
						<UserProfileForm onClose={onCloseUserProfile}/>
					</UserProfileWrapper>
				)}
				<div className={noteHeader}>
					<div>
						{online ? <p
							className="lowercase text-green-500 before:content-['●']"
						>online
						</p> : <p
							className="lowercase text-red-500 before:content-['●']"
						>offline</p>}
					</div>
					<div>
						<button
							className='flex text-[16px] items-baseline justify-center hover:opacity-60 cursor-pointer'
							onClick={onOpenUserProfile}>
							<span
								className=' text-[20px]'>🙋‍♂️</span>
							<span
							 	className='text-[#1976d3] font-[Roboto, sans-serif] font-medium capitalize gap-[8px] whitespace-nowrap hover:underline transition-all duration-200 '>User profile</span>
						</button>
					</div>
					<div className={headerNoteBtn}>
						
						<button
							className={btnCreate}
							onClick={onOpenForm}
						>
							Open
						</button>
						<button
							className={btnClear}
							onClick={handleCleanNotes}
						>
							Clear
						</button>
					</div>
					<div className='flex pr-[10px]'>
						<label className='relative inline-flex cursor-pointer items-center'>
							<input 
								type="checkbox"
								checked={theme === 'dark'}
								onChange={handleChange}
								className='sr-only peer' />
							<div className="h-[40px] w-[80px] rounded-full border-[1px] border-[#1976d3] bg-white after:absolute after:start-[5px] after:top-0.5 after:h-[35px] after:w-[35px] after:bg-[#1976d3] after:rounded-full after:border after:border-[#1976d3]  after:transition-all after:content-[''] peer-checked:bg-[#1976d3] peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-white rtl:peer-checked:after:-translate-x-full">
							</div>
							{theme === 'light'? 
								<span className="ms-3 text-lm font-medium text-[#1976d3] whitespace-nowrap">
									☀️Light
								</span> : 
								<span className="ms-3 text-lm font-medium text-gray-300 whitespace-nowrap">
									🌙Dark
								</span> 
							}
							
						</label>
					</div>
				</div>
				<div className={noteBody}>
					<div className={sidebarWrapper}>
						{optimisticNotes.length !== 0 ? (
							<Sidebar
								SidebarProp={{
									notes: optimisticNotes,
									onContextMenu: onContextMenu,
									onEditNote: onEditNote,
									onDeleteNote: onDeleteNote,
								}}
							>
								<Sidebar.FilterGroup />
								<Sidebar.SidebarList />
							</Sidebar>
						) : (
							<div className={arrEmpty}>
								
								<div className={Empty_note_round}>
									<img  src={Empty_note} alt='no_notes' width={210} className={arrEmptySvg} />
									<h2 className={arrEmptyText}>You don't have any notes yet</h2></div>
							</div>
						)}
						{state.isOpenMenu && state.coord && state.noteItem ? (
							<ContextMenu
								x={state.coord.x}
								y={state.coord.y}
								menuRef={menuRef}
								onDeleteNote={() => onDeleteNote(state.noteItem!)}
								onEditNote={() => onEditNote()}
								onSetStatusCompleted={() =>
									onSetStatusCompleted(state.noteItem!)
								}
								onSetStatusInprogress={() =>
									onSetStatusInprogress(state.noteItem!)
								}
								status={state.noteItem.status === 'completed'}
							/>
						) : null}
					</div>
				</div>
			</div>
		</>
	);
}
