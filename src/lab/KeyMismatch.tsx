import { useState } from 'react';

interface Prop{
    id:string;
    createdAt:string;
}

export default function KeyMismatch(){
  const[state, setState] = useState<Prop[]>([
    {id:'A', createdAt: new Date().toLocaleString()},
    {id:'B', createdAt: new Date().toLocaleString()},
    {id:'C', createdAt: new Date().toLocaleString()},
  ]);
  const handleAddToTop = (() => {
    const newItem = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setState((prev) => [newItem, ...prev]);
  }
  );
  return (
    <div>
      {state.map((item, index) => (
        <div key={index}>
          <p>{item.id} - {item.createdAt}</p>
          <input className="px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none focus:border-[#1976d3] font-[Roboto, sans-serif]"
            defaultValue={item.id}/>   
        </div>
      )
      )}
      <button  className='flex uppercase px-6 py-2 text-white bg-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium transition-all duration-200
    hover:bg-white hover: border-[#1976d3] hover: border-[1px] hover:text-[#1976d3] cursor-pointer' onClick={handleAddToTop}>Add to top
      </button>
    </div>
  );
}
