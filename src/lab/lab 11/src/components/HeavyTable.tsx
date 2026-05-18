import { memo } from "react";

interface HeavyTableProps {
  data: any[];
  onRowDelete: (id: number) => void;
}

function HeavyTable({ data, onRowDelete }: HeavyTableProps) {

  /* !!! НЕ ТРОГАТЬ !!!*/
  const start = performance.now();
  while (performance.now() - start < 300) {
    /* !!! НЕ ТРОГАТЬ !!!*/
  }
  /* !!! НЕ ТРОГАТЬ !!!*/
  console.log('HeavyTable')
  return (
    <div style={{ border: '2px solid red', padding: '10px', marginTop: '20px' }}>
      <h3>Аналитическая таблица</h3>
      <ul>
        {data.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            {item.name} 
            <button 
              onClick={() => onRowDelete(item.id)} 
              style={{ marginLeft: '10px' }}
            >
              Удалить строку
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(HeavyTable);