import { useState } from 'react';
import HeavyTable from './components/HeavyTable';
import { processAnalyticsData } from './utils/heavyMath';
import { useMemo, useCallback } from 'react';

/* !!! НЕ ТРОГАТЬ !!!*/ 
  const rand = Math.random() * 100; 
/* !!! НЕ ТРОГАТЬ !!!*/

export default function App() {

  const [searchQuery, setSearchQuery] = useState('');
  console.log('App')

  const [db, setDB] = useState(() => 
    Array.from({ length: rand }, (_, i) => ({ id: i, name: `Строка данных #${i + 1}` }))
  );

  const processedData = useMemo(()=> processAnalyticsData(db), [db]) ;


  const handleRowDelete =useCallback((id: number) => {

    /* !!! НЕ ТРОГАТЬ !!!*/ 
      const newDb = db.filter(row => row.id !== id); 
    /* !!! НЕ ТРОГАТЬ !!!*/
      setDB(newDb); 
    /* !!! НЕ ТРОГАТЬ !!!*/

  }, [db]) ;

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h1>Лабораторная: Оптимизация</h1>
      
      <p>
        <strong>Задание:</strong> Начни быстро печатать текст в поле поиска. 
        Ты увидишь, как интерфейс зависает после каждой буквы. 
        Используй <code>React.memo</code>, <code>useMemo</code> и <code>useCallback</code>, чтобы инпут работал быстрее.
      </p>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск по дашборду..."
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
      />

      <p>Твой запрос: <strong>{searchQuery}</strong></p>

      <HeavyTable 
        data={processedData} 
        onRowDelete={handleRowDelete} 
      />
    </div>
  );
}