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
			<UserCircleIcon className='h-xsmall-logo md:h-small-logo w-small-logo mx-6 cursor-pointer' onClick={handleDisplayMenu} />
          
			{displayPopoutMenu && 
              <div className='absolute top-[4.5rem] right-0 min-h-popout-menu h-auto md:min-w-popout-menu min-w-popout-menu-mobile w-auto bg-zinc-200' > 
                  
              	{/* Logout Button; Uncomment */}
              	<div className='w-full h-full'>
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
				
                    
              </div>
			}   
		</div >
      
        
	// End code.
	)
}

export default PopoutMenu