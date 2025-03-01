import React from 'react'
import NavBar from '../../components/NavBar'

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className='font-heading'>
      <NavBar />
      {children}
    </main>
  )
}

export default Layout
