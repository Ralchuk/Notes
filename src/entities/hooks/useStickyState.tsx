import { useState, useEffect } from 'react';

export default function useStickyState<T>(key: string, defaultValue: T) {
  const [content, setContent] = 
  useState(() => {
    const stored = localStorage.getItem(key);

    if (stored) return JSON.parse(stored);
    return defaultValue;
    
  });

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if(stored) setContent(JSON.parse(stored));
    else setContent( defaultValue);
  }, [key, content]
  );

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(content));
    } catch (e) {
      console.error('Ошибка при сохранении...');
    }
  }, [key, content]);

  
  return [content, setContent];
}
