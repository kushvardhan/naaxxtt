"use client";

import { useContext } from 'react';
import { ThemeContext } from "../../../../context/ThemeContext";

export default function Home() {

  const theme = useContext(ThemeContext);
  if (!theme) return null;

  return (
<div
  className={`w-screen h-[calc(100vh-6rem)] flex items-center justify-center 
    ${theme.mode === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
  
  <button
    onClick={() => theme.setMode(theme.mode === 'dark' ? 'light' : 'dark')}
    className="p-2 rounded bg-gray-200 dark:bg-gray-800"
  >
    Toggle to {theme.mode === 'dark' ? 'Light' : 'Dark'} Mode
  </button>
  
  HEY Yo
</div>
  );
}
