"use client";

import { useContext } from 'react';
import { ThemeContext } from "../../../../context/ThemeContext";
import Link from 'next/link';
import {Button} from '../../../components/Shared/button';

export default function Home() {

  const theme = useContext(ThemeContext);
  if (!theme) return null;

  return (
<div className='h-[calc(100vh-120px)] w-full mt-20'>
    <div className={` flex w-full  justify-between items-center gap-4 sm-flex-row sm:items-center ${theme.mode === 'dark' ? "bg-black" : "bg-white"}`}>
      <h1 className={`text-2xl font-bold font-mono text ${theme.mode === 'dark' ? "text-white" : "text-black"} `}>All Questions</h1>
      <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
        <Button className={`bg-orange-400 min-h-[46px] px-4 py-3 text-semibold}`}>  
          Ask Quetion
        </Button>
      </Link>
    </div>
    <div className={`mt-11 flex justify-between gap-5 max-sm:flex-col sm: items-center ${theme.mode === 'dark' ? "bg-black" : "bg-white"}`}>
      LocalSearchBar
      
    </div>
</div>
  );
}
