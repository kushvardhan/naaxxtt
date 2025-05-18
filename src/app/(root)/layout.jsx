"use client"
import React from 'react'
import TopNav from '../../../components/shared/TopNav';

export default function Layout({ children }) {
  return (
    <main className={`relative`} >
      <TopNav />
      <div className='bg-red-800 flex flex-col'>
        LeftSideBar
      <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14'>
        <div className='mx-auto w-full max-w-5xl '>
        {children}
        </div>
        </section>
      RightSideBar 
      </div>
    </main>
  )
}
