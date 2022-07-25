import React, { useState } from 'react' ;
import { useNavigate } from 'react-router-dom' ;
import Button from '../sm_components/Button' ;
import { UserCircleIcon } from '@heroicons/react/outline' ;
import UserLinks from '../sm_components/UserLinks' ;


const PopoutMenu = ({ handleDisplayLogout, userId }) => {
    
	const navigate = useNavigate() ;
	const [displayPopoutMenu, setDisplayPopoutMenu] = useState(false) ; 


	const handleDisplayMenu = () => {
		setDisplayPopoutMenu(!displayPopoutMenu) ;
	}
	
	const handleAccountPreferences = () => {
		navigate('/account-preferences') ;
	}
	
	const handleContactUs = () => {
		navigate('/support') ;
	}


	return (
	// Start actual code.
		<div className='flex items-center justify-end'>
			<UserCircleIcon className='h-xsmall-logo md:h-small-logo w-small-logo mx-6 cursor-pointer' onClick={handleDisplayMenu} />
          
			{displayPopoutMenu && 
              <div className=' absolute top-[4.25rem] right-0 min-h-popout-menu h-auto md:min-w-popout-menu min-w-popout-menu-mobile mid:max-w-third max-w-half w-auto bg-zinc-200' > 
              	<div className='grid grid-rows-3 grid-cols-1 p-6 h-full max-w-full'> 
              	{/* Logout Button */}
              	<div className='w-full h-full flex items-center justify-end row-span-1 my-2'>
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
              		<div className='flex items-center justify-end row-span-1 my-2'>
              			<UserLinks text={"Account Preferences"} handleClick={handleAccountPreferences} />
              		</div>
              		<div className='flex items-center justify-end row-span-1 my-2'>
              			<UserLinks text={"Contact Us"} handleClick={handleContactUs} />
              		</div>
              	</div>
					

              </div>
			}   
		</div >
      
        
	// End code.
	)
}

export default PopoutMenu