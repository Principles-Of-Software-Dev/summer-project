import React from 'react'
import LogoName from '../sm_components/LogoName'

// Banner and Logo with no extra links or site access
const TopBar = ({ children }) => {
	return (
		<div className='sticky top-0 z-20'>
			{/* start actiual code */}
			<nav className='h-navbar w-screen bg-zinc-200 grid grid-cols-2 grid-rows-1 drop-shadow-lg '>
             
				{/* Logo and project name. */}
				< LogoName />
				{children}
			</nav>
		</div>
      
	)
}

export default TopBar