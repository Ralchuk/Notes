import { create } from 'zustand';

interface Note1 {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  status: 'inprogress' | 'completed';
}

interface NoteStateForm {
	isOpenForm: boolean,
	setIsOpenForm: () => void,
	setIsCloseForm: () => void,
	title: string,
	setTitle: (text: string) => void,
  text: string,
	setText: (text: string) => void,
}

interface NoteStateUserProfile {
	isOpenUserProfile: boolean,
	setIsOpenUserProfile: () => void,
	setIsCloseUserProfile: () => void,
}


interface NoteState {
  note: Note1[],
	saveNote: ({title, text}: {title: string, text: string}) => void,
	editNote: (id: string, title: string, text: string) => void,
	deleteNote: (id: string) => void,
	clearNotes: () => void,
  status: 'inprogress' | 'completed',
	setStatusCompleted: (id: string) => void,
	setStatusInprogress: (id: string) => void
}

export const useReduceNoteForm = create<NoteStateForm>((set) => ({
	isOpenForm: false,
	setIsOpenForm: () => set(() => ({isOpenForm: true})),
	setIsCloseForm: () => set(() => ({isOpenForm: false})),
	setTitle: (text: string) => set(() => ({title: text})),
	text: '',
	setText: ((text: string) => set(() => ({text: text}))),
	title: '',
}));

export const useReduceProfile = create<NoteStateUserProfile>((set) => ({
 	isOpenUserProfile: false,
	setIsOpenUserProfile: () => set(() => ({isOpenUserProfile: true})),
	setIsCloseUserProfile: () => set(() => ({isOpenUserProfile: false})),
}));



export const useReduceNote = create<NoteState>((set) => ({
	
	note: [],
	saveNote: ({title, text}: {title: string, text: string}) => set((state) => ({note: [...state.note, {
		id: Date.now().toString(),
		createdAt: new Date(),
		content: text,
		title: title,
		status: 'inprogress'}]})),
	deleteNote: (id: string) => set((state) => ({note: state.note.filter((e) => e.id !== id)})),
	editNote: (id: string, title: string, text: string) => set((state) => ({note: state.note.map((e) => e.id === id ? {...e, title: title, content: text} : e)})),
	clearNotes: (() => set({note: []})),
	status: 'inprogress',
	setStatusCompleted: ((id: string) => set((state) => ({note: state.note.filter((e) => e.id === id ? {...e, status: 'completed'} : e)}))),
	setStatusInprogress: ((id: string) => set((state) => ({note: state.note.filter((e) => e.id === id ? {...e, status: 'inprogress'} : e)})))
})
);

