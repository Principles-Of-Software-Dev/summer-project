import React, { useState } from 'react'
import Button from '../sm_components/Button'
import { UserCircleIcon } from '@heroicons/react/outline'

const PopoutMenu = ({ handleDisplayLogout }) => {
    
	const [displayPopoutMenu, setDisplayPopoutMenu] = useState(false) ; 

	const handleDisplayMenu = () => {
		setDisplayPopoutMenu(!displayPopoutMenu) ;
	}

	return (
	// Start actual code.
		<div className='flex items-center justify-end'>
			<UserCircleIcon className='h-small-logo w-small-logo mx-6 cursor-pointer' onClick={handleDisplayMenu} />
          
			{displayPopoutMenu && 
              <div> 
                  
              	{/* Logout Button; Uncomment */}
              	< Button
              		height="h-small-button"
              		color='bg-zinc-400'
              		buttonText='Logout'
              		textColor='text-c-white'
              		hoverColor='hover:bg-zinc-500'
              		disable={false}
              		onClick={handleDisplayLogout}
              	/>
              </div>
			}   
		</div >
      
        
	// End code.
	)
}

export default PopoutMenu