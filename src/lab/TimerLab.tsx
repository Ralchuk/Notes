import {useState, useReducer, useEffect} from "react";


/* state for timer 
 для кругов использовать круги
 пауза
 ресет */



const TimerLab = () => {
    const [time, setTime] = useState<number>(0)
    const [isRunning, setIsRunning] = useState(false)
    const [lap, setLap] = useState<number[]>([])

    function handleClick(){
        setIsRunning(true);
    }
    function handlLap(){
        setLap([...lap, time])
    }


    useEffect(() => {
        if (isRunning === false) return; 
        const id = setInterval(() => setTime((prev) => prev + 1), 1000);
        return () => clearInterval(id);
        
    },[isRunning]);

    return (
        <div className="flex flex-col  items-center">
            <p>{time}</p>
                {lap.map((item, index) => (
                    <div key={index}>
                        {item}
                    </div>
                )
            )}
            <div>
            <button className="py-1 px-4 rounded-[5px] border-[1px]" onClick={handleClick}>GO</button>
            <button className="py-1 px-4 rounded-[5px] border-[1px]" onClick={handlLap}>Set Lap</button>
            </div>
            
        </div>
    )
}

export default TimerLab