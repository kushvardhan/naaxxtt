"use client";
import React from 'react'
import Link from 'next/link'

const TopNav = () => {
  return (
    <div className='w-screen h-[6rem] bg-zinc-900 flex justify-between items-center'>
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