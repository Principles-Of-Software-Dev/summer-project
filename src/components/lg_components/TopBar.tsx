import React from 'react'
import LogoName from '../sm_components/LogoName'

// Banner and Logo with no extra links or site access
const TopBar = () => {
  return (
      <div>
          {/* start actiual code */}
          <nav className='h-navbar w-screen bg-zinc-200 grid grid-cols-2 grid-rows-1 fixed top-0 drop-shadow-lg '>
             
            {/* Logo and project name. */}
            < LogoName />
          </nav>
      </div>
      
  )
}

export default TopBar