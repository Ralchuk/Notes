import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

type LazyPropType = 'btn1' | 'btn2' | 'btn3';

export default function LazyChart1({isShow}: {isShow: LazyPropType}){
	const grafic = useRef<HTMLCanvasElement | null>(null);
	useEffect(()=>{

		if(!grafic.current)return;
		const chart = new Chart(grafic.current, {
			type: 'line',
			data: {
				labels: ['dec', 'jan', 'feb'],
				datasets: [
					{
						label: 'My First Dataset',
						data: [65, 59, 80, 81, 56, 55, 40],
						fill: false,
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.1
					},
				],
			}
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

