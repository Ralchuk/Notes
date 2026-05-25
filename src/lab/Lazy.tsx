import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

export default function Chart1(){
	const Grafic = useRef<HTMLCanvasElement | null>(null);
	useEffect(()=>{
		if(!Grafic.current)return;
		const chart=	new Chart(Grafic.current, {
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
	},[]);

	return (
		<>
			<div className='flex w-[800px] h-[900px]'>
				<canvas ref={Grafic}></canvas>
			</div>
		 
		</>
	);
};
