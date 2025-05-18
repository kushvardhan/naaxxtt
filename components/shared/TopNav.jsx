"use client";
import React,{ useContext } from 'react'
import Link from 'next/link'
import { ThemeContext } from '../../context/ThemeContext';

const TopNav = () => {

      const theme = useContext(ThemeContext);
      if (!theme) return null;

  return (
    <div className={`flex-between fixed z-50 w-full gap-5 p-6 ${theme.mode === 'dark' ? 'bg-[#111] text-white' : 'bg-[#eee] text-black shadow-light-300'} sm:px-12`}>
        <div className='flex items-center px-6 '>
            <Link href='/' className='font-black text-3xl'>
            NextText
            </Link>
        </div>
        <div className='flex items-center gap-10 px-6'>
        <Link className='text-lg font-mono' href='/'>Home</Link>
        <Link className='text-lg font-mono' href='/about'>About</Link>
        <Link className='text-lg font-mono' href='/contact'>Contact</Link>
        </div>
    </div>
  )
}

export default TopNav