import React from 'react'

const TopNav = () => {
  return (
    <div className='w-full h-[6rem] flex justify-between items-center'>
        <div className='flex items-center'>
            <img className='' src="./src/app/favicon.ico" alt="Logo" title='Logo' />
        </div>
        <div>
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
        <Link href='/contact'>Contact</Link>
        </div>
    </div>
  )
}

export default TopNav