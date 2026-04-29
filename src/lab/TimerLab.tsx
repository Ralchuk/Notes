import {useReducer, useEffect} from "react";

interface TimerState {
    time: number,
    isRunning: boolean,
    lap: number[],
};

type TimerAction = 
    | {
        type: 'START';
    }
    | {
        type: 'LAP';
        payload: {time: number};
    }
    | {
        type: 'PAUSE';
    }
    | {
        type: 'RESET';
    }
    | {
        type: 'TICK';
    };



const initialState: TimerState = {
    time: 0,
    isRunning: false,
    lap: []
};

function reducer(state: TimerState, action: TimerAction): TimerState {
    switch (action.type) {
        case 'START': 
            return {
                ...state,
                isRunning: true,
            };
        case 'LAP':
            return {
                ...state,
                lap:[...state.lap, action.payload.time],
            };
        case 'PAUSE':
            return {
                ...state,
                isRunning: false,
            };
        case 'RESET':
            return {
                ...state,
                isRunning:false,
                time: 0,
                lap:[],
            }
        case 'TICK':
            return {
                ...state,
                time: state.time + 1,
            }; 
    
        default:
            return state;
    }
}

const TimerLab = () => {

    const[state, dispatch] = useReducer(reducer, initialState);

    // const [time, setTime] = useState<number>(0);
    // const [isRunning, setIsRunning] = useState(false);
    // const [lap, setLap] = useState<number[]>([]);

    function handleClick(){
        dispatch({type: 'START'})
        // setIsRunning(true);
    }

    function handlePause(){
        dispatch({type: 'PAUSE'})
        // setIsRunning(false);
    }

    function handlLap(){
        dispatch({type: 'LAP',
            payload: {time: state.time},
        });
        // setLap([...lap, time]);
    }
    function handleReset(){
        dispatch({type: 'RESET'})
        // setIsRunning(false);
        // setTime(0);
    }


    useEffect(() => {
        if (state.isRunning === false) return; 
        const id = setInterval(() => dispatch({type: 'TICK'}), 1000);
        return () => clearInterval(id);
        
    },[state.isRunning]);

    return (
        <div className="flex flex-col  items-center">
            <p>{state.time}</p>
            <div>
                {state.lap.map((item, index) => (
                    <div className="flex text-start" key={index}>
                        Lap {index +1 } = {item} sec
                    </div>
                )
                )}
            </div>
            
            <div>
            <button className="py-1 px-4 rounded-[5px] border-[1px]" onClick={handleClick}>GO</button>
            <button className="py-1 px-4 rounded-[5px] border-[1px]" onClick={handlLap}>Set Lap</button>
            <button className="py-1 px-4 rounded-[5px] border-[1px]" onClick={handlePause}>Pause</button>
            <button className="py-1 px-4 rounded-[5px] border-[1px]" onClick={handleReset}>Reset</button>
            </div>
            
        </div>
    )
}

export default TimerLab