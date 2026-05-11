import { useState, createContext } from 'react';

type ContextState = 'dark' | 'light';
type ContextDispatch = (value: ContextState) => void;

const NoteContextState = createContext<ContextState | null>(null);
const NoteContextDispatch = createContext<ContextDispatch | null>(null);

const ThemeComponent = ({children}: {children: React.ReactNode}) => {
	const[theme, setTheme] = useState<ContextState>('light');
	return (
		<NoteContextState value={theme}>
			<NoteContextDispatch value={setTheme}>
				{children}
			</NoteContextDispatch>
		</NoteContextState>
	);
};

export default ThemeComponent;
export {NoteContextState, NoteContextDispatch};
