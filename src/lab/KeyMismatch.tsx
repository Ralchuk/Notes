import { useState } from "react";

interface Prop{
    id:string;
    createdAt:string;
}

export default function KeyMismatch(){
    const[state, setState] = useState<Prop[]>([
        {id:"A", createdAt: new Date().toLocaleString()},
        {id:"B", createdAt: new Date().toLocaleString()},
        {id:"C", createdAt: new Date().toLocaleString()},
    ])
    const handleAddToTop = (() => {
        const newItem = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        }
        setState((prev) => [newItem, ...prev])
    }
    )
    return (
        <div>
            {state.map((item, index) => (
                <div key={index}>
                    <p>{item.id} - {item.createdAt}</p>
                    <input defaultValue={item.id}/>   
                </div>
            )
            )}
            <button onClick={handleAddToTop}>Add to top
            </button>
        </div>
    )
}