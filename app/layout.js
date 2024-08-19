import './globals.css'
import React from 'react'
import Navbar from '@/components/Navbar'
// import {Providers} from "./providers";



export default function RootLayout({children}) {
  return (
    <html lang="en" className='dark'>
      <body className='hide-scrollbar italic'>
        
          <Navbar />
          {children}
        
      </body>
    </html>
  );
}