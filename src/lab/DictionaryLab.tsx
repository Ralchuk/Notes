import { createContext, useContext, useState } from 'react';

const inputStyle = 'flex w-[200px] px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none focus:border-[#1976d3] font-[Roboto, sans-serif] placeholder:text-gray-400 focus:placeholder-transparent';
const btnStyle = 'flex px-[10px] py-[5px] bg-blue-500 rouded-[5px] rounded-[5px] uppercase font-[Roboto, sans-serif] text-white font-medium transition-all duration-200 hover:bg-white border-[1px] border-blue-500 hover:text-blue-500 hover:border-blue-500 cursor-pointer';
const btnWrapper = 'flex p-[10px] gap-[10px]';

type TranslateType = 'eng' | 'ua' | 'ru';
type TranslateDispatch = (value: TranslateType) => void;


const TranslateContextState = createContext<TranslateType | null>(null);
const TranslateContextDispatch = createContext<TranslateDispatch | null>(null);


const TranslateComponent = ({children}: {children: React.ReactNode}) => {
	const[lang, setLang] = useState<TranslateType>('eng');
	if (TranslateContextState === null) return;
	return (
		<TranslateContextState value={lang}>
			<TranslateContextDispatch value={setLang}>
				{children}
			</TranslateContextDispatch>
		</TranslateContextState>
	);
};

const TranslateContent = () => {
	const context = useContext(TranslateContextState);
	if(context === null)return;
	const lang = context;
	return (
		<>
			<input 
				className={inputStyle}
				type="text"
				placeholder={
					lang === 'eng' ? 'Type here...': lang === 'ua' ? 'Введіть текст...' : lang === 'ru' ? 'Введите текст' : 'Type here...'} />
		</>
	);
};


const TranslateLanguage = () => {
	const context = useContext(TranslateContextDispatch);
	if(context === null)return;
	const setLang = context;
	return (
		<>
			<div
				className={btnWrapper}>
				<button
					className={btnStyle}
					onClick={() => setLang('eng')}>
					Eng
				</button>
				<button
					className={btnStyle}
					onClick={() => setLang('ua')}>
					Укр</button>
				<button
					className={btnStyle}
					onClick={() => setLang('ru')}>
					Рус
				</button>
			</div>
			
		</>
	);
};

const Translate = Object.assign(TranslateComponent,{
	Language: TranslateLanguage,
	Content: TranslateContent
});

export default Translate;
