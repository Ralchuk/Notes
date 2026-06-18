import { create } from 'zustand';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  status: 'inprogress' | 'completed';
}

interface NoteState {
  isOpenForm: boolean,
	setIsOpenForm: () => void,
	setIsCloseForm: () => void,
  isOpenUserProfile: boolean,
	setIsOpenUserProfile: () => void,
	setIsCloseUserProfile: () => void,
  note: Note[],
	saveNote: ({title, text}: {title: string, text: string}) => void,
	editNote: (id: string, title: string, text: string) => void,
	deleteNote: (id: string) => void;
	clearNotes: () => void;
  title: string,
	setTitle: (text: string) => void,
  text: string,
	setText: (text: string) => void,
  status: 'inprogress' | 'completed',
	setStatusCompleted: (id: string) => void;
	setStatusInprogress: (id: string) => void;
}

export const useReduceNote = create<NoteState>((set) => ({
	isOpenForm: false,
	setIsOpenForm: () => set(() => ({isOpenForm: true})),
	setIsCloseForm: () => set(() => ({isOpenForm: false})),
	isOpenUserProfile: false,
	setIsOpenUserProfile: () => set(() => ({isOpenUserProfile: true})),
	setIsCloseUserProfile: () => set(() => ({isOpenUserProfile: false})),
	note: [],
	saveNote: ({title, text}: {title: string, text: string}) => set((state) => ({note: [...state.note, {
		id: Date.now().toString(),
		createdAt: new Date(),
		content: text,
		title: title,
		status: 'inprogress'}]})),
	title: '',
	deleteNote: (id: string) => set((state) => ({note: state.note.filter((e) => e.id !== id)})),
	editNote: (id: string, title: string, text: string) => set((state) => ({note: state.note.filter((e) => e.id === id ? {...e, title: title, content: text} : e)})),
	clearNotes: (() => set({note: []})),
	setTitle: (text: string) => set(() => ({title: text})),
	text: '',
	setText: ((text: string) => set(() => ({text: text}))),
	status: 'inprogress',
	setStatusCompleted: ((id: string) => set((state) => ({note: state.note.filter((e) => e.id === id ? {...e, status: 'completed'} : e)}))),
	setStatusInprogress: ((id: string) => set((state) => ({note: state.note.filter((e) => e.id === id ? {...e, status: 'inprogress'} : e)})))
})
);

