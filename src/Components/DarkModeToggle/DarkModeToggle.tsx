import { useState, useRef, useEffect } from 'react';
import './DarkModeToggle.css';
import { useBeforeUnload } from 'react-router-dom';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(isDark());
  const checked = useRef(darkMode);

  useEffect(() => {
    if(document.body.className.includes('overflow'))
      document.body.className = darkMode ? 'dark overflow' : 'light overflow';
    else
      document.body.className = darkMode ? 'dark' : 'light';
    checked.current = darkMode;
  }, [darkMode]);

  useBeforeUnload(()=>{ //when the whole page closes
    localStorage.setItem('darkMode', JSON.stringify(checked.current));
  })
  return (
    <label className='switch'>
      <input id='darkmode-toggle' type='checkbox'
        defaultChecked={ darkMode }
        onChange={() => setDarkMode(state => {
          const nextState = !state;
          return nextState
        }
        )}
      />
      <span className='slider round'></span>
    </label>
  );
}

function isDark(){
  return JSON.parse(localStorage.getItem('darkMode') ?? 'true') as boolean;
}