import { lazy, Suspense } from 'react';
import { useState } from 'react';

const Chart1 = lazy(() => import('./Chart1'));
const Chart2 = lazy(() => import('./Chart2'));
const Chart3 = lazy(() => import('./Chart3'));


export default function LazyApp(){
	const [isShow, setIsShow] = useState<'btn1' | 'btn2' | 'btn3'| null>(null);
	function handleBtn1(){
		setIsShow('btn1');
	};
	function handleBtn2(){
		setIsShow('btn2');
	};
	function handleBtn3(){
		setIsShow('btn3');
	};
	return (
		<div>
			<div className='flex flex-r justify-start px-[100px] gap-[100px] pt-[10px]'>
				<div className=' px-[10px] py-[5px] border-[1px] rounded-full hover:opacity-50 hover:border-red-500 hover:text-red-500 cursor-pointer'>
					<input 
						className='appearance-none'
						type="radio" 
						name="btn" 
						id="btn1"
						onChange={handleBtn1} />
					<label 
						className='cursor-pointer uppercase'
						htmlFor="btn1">
							Button1
					</label>
					
				</div>
				<div className=' px-[10px] py-[5px] border-[1px] rounded-full hover:opacity-50 hover:border-red-500 hover:text-red-500 cursor-pointer'>
					<input 
						className='appearance-none'
						type="radio" 
						name="btn" 
						id="btn2"
						onChange={handleBtn2} />
					<label 
						className='cursor-pointer uppercase'
						htmlFor="btn2">
							Button2
					</label>
				</div>
				<div className=' px-[10px] py-[5px] border-[1px] rounded-full hover:opacity-50 hover:border-red-500 hover:text-red-500 cursor-pointer'>
					<input 
						className='appearance-none'
						type="radio" 
						name="btn" 
						id="btn3"
						onChange={handleBtn3} />
					<label 
						className='cursor-pointer uppercase'
						htmlFor="btn3">
							Button3
					</label>
				</div>
			</div>
			<div 
				className='flex pt-[20px]'>
				<Suspense fallback={<div>Loading...</div>}>
					{isShow === 'btn1' && <Chart1 isShow={isShow}/>}
					{isShow === 'btn2' && <Chart2 isShow={isShow}/>}
					{isShow === 'btn3' && <Chart3 isShow={isShow}/>}
				</Suspense>
			</div>

		</div>
	);
}
