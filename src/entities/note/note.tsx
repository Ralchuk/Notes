import Form from '@/entities/note/form';
import ContextMenu from './contextMenu';
import Sidebar from './sidebar';
import ModalWrapper from './modalForm';
import { NoteContextDispatch, NoteContextState } from './theme';
import Empty_note from '../../../img/undraw_add-notes_9xls.svg';

import {
	type Note,
	type MenuAction,
	type MenuState,
	type AutoResizeTextareaHandle,
	type NoteState,
	type NoteAction,
} from './model/types';
import { useEffect, useRef, useReducer, useContext, useCallback } from 'react';

// main classes
const container =
	'flex flex-col items-center content-center w-full  items-center h-screen bg-white dark:bg-[#07151e]';
const noteHeader =
	'flex flex-r justify-stretch w-full items-center pt-[30px] pb-[30px] gap-[15px] border-b border-[#1976d3]';
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

// reducer для заметок

const initialStateNote: NoteState = {
	isOpen: false,
	note: [],
	title: '',
	text: '',
	status: 'inprogress',
};

function reducerNote(state: NoteState, action: NoteAction): NoteState {
	switch (action.type) {
	case 'OPEN_FORM':
		return {
			...state,
			isOpen: true,
		};
	case 'SET_TITLE':
		return {
			...state,
			title: action.payload,
		};
	case 'SET_TEXT':
		return {
			...state,
			text: action.payload,
		};
	case 'SAVE_NOTE':
		return {
			...state,
			note: [
				...state.note,
				{
					id: Date.now().toString(),
					createdAt: new Date(),
					content: action.payload.text,
					title: action.payload.title,
					status: 'inprogress',
				},
			],
			title: '',
			text: '',
			isOpen: false,
		};
	case 'CLEAR_FORM':
		return {
			...state,
			title: '',
			text: '',
		};
	case 'CLOSE_FORM':
		return {
			...state,
			title: '',
			text: '',
			isOpen: false,
		};
	case 'CLEAR_NOTES':
		return {
			...state,
			note: [],
		};
	case 'DELETE_NOTE':
		return {
			...state,
			note: [...state.note.filter((n) => n.id !== action.payload.id)],
		};
	case 'EDIT_NOTE':
		return {
			...state,
			note: [
				...state.note.map((n) =>
					n.id === action.payload.id
						? {
							...n,
							title: action.payload.title,
							content: action.payload.content,
							createdAt: action.payload.createdAt,
						}
						: n,
				),
			],
		};
	case 'SET_STATUS_INPROGRESS':
		return {
			...state,
			note: [
				...state.note.map((n) =>
					n.id === action.payload.id
						? {
							...n,
							status: 'inprogress' as const,
						}
						: n,
				),
			],
		};
	case 'SET_STATUS_COMPLETED':
		return {
			...state,
			note: [
				...state.note.map((n) =>
					n.id === action.payload.id
						? {
							...n,
							status: 'completed' as const,
						}
						: n,
				),
			],
		};
	case 'SET_FILTER':
		return {
			...state,
			status: action.payload,
		};
	}
}

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
}

export default function Note() {
	// useReducer Note
	const [stateNote, dispatchNote] = useReducer(reducerNote, initialStateNote);

	// useReducer ContexMenu

	const auto = useRef<AutoResizeTextareaHandle | null>(null);

	const [state, dispatch] = useReducer(reducer, initialState);

	

	function onCreate() {
		dispatchNote({
			type: 'SAVE_NOTE',
			payload: { title: stateNote.title, text: stateNote.text },
		});
	}

	function onClose() {
		dispatchNote({ type: 'CLOSE_FORM' });
	}

	function onOpen() {
		dispatchNote({ type: 'OPEN_FORM' });
	}

	function setTitle(value: string) {
		dispatchNote({
			type: 'SET_TITLE',
			payload: value,
		});
	}

	function setText(value: string) {
		dispatchNote({
			type: 'SET_TEXT',
			payload: value,
		});
	}

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!stateNote.title.trim() || !stateNote.text.trim()) return;
		if (state.noteItem) {
			dispatch({ type: 'CLOSE_MENU' });
			dispatchNote({
				type: 'EDIT_NOTE',
				payload: {
					id: state.noteItem.id,
					title: stateNote.title,
					content: stateNote.text,
					createdAt: new Date(),
				},
			});
		} else {
			onCreate();
		}
		dispatchNote({ type: 'CLOSE_FORM' });
	}

	function handleCleanNotes() {
		dispatchNote({ type: 'CLEAR_NOTES' });
		// setNote([]);
	}

	function handleClearForm() {
		dispatchNote({ type: 'CLEAR_FORM' });
		// setTitle('');
		auto.current?.resetAndFocus();
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
		dispatchNote({ type: 'OPEN_FORM' });
		if (state.noteItem) {
			dispatchNote({
				type: 'SET_TITLE',
				payload: state.noteItem?.title,
			});
			dispatchNote({
				type: 'SET_TEXT',
				payload: state.noteItem?.content,
			});
		}
	},[dispatch, dispatchNote, state.noteItem]);


	// function onDeleteNote(item: Note) {
	// 	dispatch({ type: 'CLOSE_MENU' });
	// 	dispatchNote({
	// 		type: 'DELETE_NOTE',
	// 		payload: { id: item.id },
	// 	});
	// };

	const onDeleteNote = useCallback((item: Note) => {
		dispatch({ type: 'CLOSE_MENU' });
		dispatchNote({
			type: 'DELETE_NOTE',
			payload: { id: item.id },
		});
	},[dispatch, dispatchNote]);


	function onSetStatusCompleted(item: Note) {
		dispatchNote({
			type: 'SET_STATUS_COMPLETED',
			payload: { id: item.id },
		});
		dispatch({ type: 'CLOSE_MENU' });
	}

	function onSetStatusInprogress(item: Note) {
		dispatchNote({
			type: 'SET_STATUS_INPROGRESS',
			payload: { id: item.id },
		});
		dispatch({ type: 'CLOSE_MENU' });
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

	return (
		<>
			<div className={container}>
				{stateNote.isOpen && (
					<ModalWrapper onClose={onClose}>
						<h2 className='text-[32px] text-[#1976d3] font-[Roboto, sans-serif] font-medium'>
							Create note
						</h2>
						<Form
							title={stateNote.title}
							text={stateNote.text}
							setTitle={setTitle}
							setText={setText}
							onSubmit={handleSubmit}
							auto={auto}
						/>
						<div className='flex justify-center gap-[10px]'>
							<button
								autoFocus
								className={btnCreate}
								type='submit'
								form='note-form'
							>
								Save
							</button>
							<button
								className={btnClear}
								onClick={handleClearForm}
							>
								Clear
							</button>
						</div>
					</ModalWrapper>
				)}
				<div className={noteHeader}>
					<div className={headerNoteBtn}>
						
						<button
							className={btnCreate}
							onClick={onOpen}
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
						{stateNote.note.length !== 0 ? (
							<Sidebar
								SidebarProp={{
									notes: stateNote.note,
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
