"use client"

import React from 'react'
import { ThemeProvider } from '../../../context/ThemeContext'
import { Moon, Sun } from "lucide-react"
import { Button } from "../ui/button";
import { useTheme } from 'next-themes';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./menubar"
import { ThemeContext } from "../../../context/ThemeContext";


const ThemeProvider = () => {
  const { setTheme } = useTheme();
  const theme = useContext(ThemeContext);
  

  return (
    <Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>

  )
}

export default ThemeProvider
