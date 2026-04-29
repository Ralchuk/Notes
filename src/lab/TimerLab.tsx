import {useReducer, useEffect} from "react";

const btn = 'py-1 px-4 rounded-[10px] border-[1px] border-red-500 font-[Roboto, sans-serif] font-medium text-red-500 cursor-pointer transition-all duration-200 hover:border-red-200 hover:text-red-200 ';

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


    function handleClick(){
        dispatch({type: 'START'})
    };

    function handlePause(){
        dispatch({type: 'PAUSE'})
    };

    function handlLap(){
        dispatch({type: 'LAP',
            payload: {time: state.time},
        });
    }
    function handleReset(){
        dispatch({type: 'RESET'})
    };


    useEffect(() => {
        if (state.isRunning === false) return; 
        const id = setInterval(() => dispatch({type: 'TICK'}), 1000);
        return () => clearInterval(id);
        
    },[state.isRunning]);

    return (
        <div className="flex flex-col gap-[10px] items-center font-[Roboto, sans-serif] font-normal ">
            <p>{state.time}</p>
            <div>
                {state.lap.map((item, index) => (
                    <div className="flex text-start" key={index}>
                        Lap {index +1 } = {item} sec
                    </div>
                )
                )}
            </div>
            
            <div className="flex gap-[10px]">
            <button className={btn} onClick={handleClick}>GO</button>
            <button className={btn} onClick={handlLap}>LAP</button>
            <button className={btn} onClick={handlePause}>PAUSE</button>
            <button className={btn} onClick={handleReset}>RESET</button>
            </div>
            
        </div>
    )
}

export default TimerLab;