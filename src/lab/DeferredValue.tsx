import { useState, useDeferredValue, useMemo, memo } from 'react';


const HeavyList = memo(({text}:{text: string}) => {
	const items = useMemo(() => {
		return Array.from({length: 50000}).map((_, i) => (
			<li 
				key={i} 
				className='flex w-[100px] h-[100px] m-[10px]'
				style={{backgroundColor: text}}
			>
			</li>));
	},[text]);
	return (
		<div>
			<ul>{items}</ul>
		</div>
	);
	
});

const AppLabDef = () => {
	const [input, setInput] = useState('');
	const deferredQuery = useDeferredValue(input);
	const isSlate = input !== deferredQuery;
	return (
		<>
			<input 
				className='flex border-[1px]'
				placeholder='type name of color...'
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)} />
			<div 
				style={{opacity: isSlate ? 0.3 : 1, transition: 'opacity 0.7s'}}>
				<HeavyList text={deferredQuery}/>
			</div>
			
		</>
	);
};

export default AppLabDef;
