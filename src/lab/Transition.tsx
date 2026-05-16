import { useState } from 'react';

const Transition = () => {
	const [input, setInput] = useState('');
	return (
		<>
			<input 
				className='flex border-[1px]'
				placeholder='type name of color...'
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)} />
			{Array.from({length: 10000}).map((_, i) => <div 
				key={i} 
				className='flex w-[100px] h-[100px] m-[10px]'
				style={{backgroundColor: input}}
			></div>)}
		</>
	);
};

export default Transition;
