// import './styleTargetCapture.css';
import { useState, useEffect, useEffectEvent } from 'react';

interface Pointer {
    x: number,
    y: number,
};

export default function TergetCapture(){
  const [pointer, setPointer] = useState<Pointer>({x:0, y:0});

  const onPoint = useEffectEvent(() => console.log(pointer));
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const currentPoint = {x: e.clientX, y: e.clientY};
    setPointer(currentPoint);
  };


  useEffect(() => {
    console.log('Подключено');
    const interval = window.setInterval(onPoint, 3000);
    return () => {
      clearInterval(interval);
      console.log('Отключено');
    };
  },
  []
  );


    
  return (
    <div>
      <div>X: {pointer.x}</div>
      <div>Y: {pointer.y}</div>
      <div className="grany"
        onClickCapture={() => console.log('Grany-clickCapture')}
        onClick={() => console.log('Grany-click')}
        onPointerMove={handlePointerMove}>
        <div className="parent"
          onClickCapture={() => console.log('Parent-clickCapture')}
          onClick={() => console.log('Parent-click')}>
          <div className="child"
            onClickCapture={() => console.log('Child-clickCapture')}
            onClick={() => console.log('Child-click')}>

          </div>

        </div>

      </div>
    </div>
        
  );
}
