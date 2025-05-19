'use client'

import React, { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext';

const LeftSideBar = () => {
  const theme= useContext(ThemeContext);

  return (
    <div className={` w-[25%] min-h-[calc(100vh-64px)] fixed relative top-[64px] ${theme.mode === 'dark' ? 'bg-black text-white' : 'bg-zinc-200 text-black'}`}>
        <div className='w-full h-full bg-blue-400 border-b-2 border-white'>
        </div>
    </div>
  )
}

export default LeftSideBar