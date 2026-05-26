import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

type LazyPropType = 'btn1' | 'btn2' | 'btn3';

export default function LazyChart2({isShow}: {isShow: LazyPropType}){
	const grafic = useRef<HTMLCanvasElement | null>(null);
	useEffect(()=>{
		
		if(!grafic.current)return;
		const chart = new Chart(grafic.current, {
			type: 'bubble',
			data: {
				datasets: [{
					label: 'First Dataset',
					data: [{
						x: 20,
						y: 30,
						r: 15
					}, {
						x: 40,
						y: 10,
						r: 10
					}],
					backgroundColor: 'rgb(255, 99, 132)'
				}]
			},
		});
		return () => chart.destroy();
	},[isShow]);

	return (
		<>
			<div className='flex flex-col'>
				<div className='flex w-[800px] h-[900px]'>
					<canvas ref={grafic}></canvas>
				</div>
			</div>
		</>
	);
};
