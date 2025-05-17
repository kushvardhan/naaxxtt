"use client"
import React from 'react'
import TopNav from '../../../components/shared/TopNav';

export default function Layout({ children }) {
  return (
    <>
      <TopNav />
      <main>{children}</main>
    </>
  )
}
