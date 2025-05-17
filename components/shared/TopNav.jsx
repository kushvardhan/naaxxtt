"use client";
import React,{ useContext } from 'react'
import Link from 'next/link'
import { ThemeContext } from '../../context/ThemeContext';

const TopNav = () => {

      const theme = useContext(ThemeContext);
      if (!theme) return null;

  return (
    <div className={`w-screen h-[6rem] ${theme.mode === 'dark' ? 'bg-[#111] text-white' : 'bg-[#eee] text-black'} flex justify-between items-center`}>
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