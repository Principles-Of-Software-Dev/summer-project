import React, { useState } from 'react' ;
import { useNavigate } from 'react-router-dom' ;
import Button from '../sm_components/Button' ;
import { UserCircleIcon } from '@heroicons/react/outline' ;
import UserLinks from '../sm_components/UserLinks' ;
import { useUser } from '../../global/authorization/UserContext' ;



const PopoutMenu = ({ handleDisplayLogout, userId, handleAddItem }) => {
	const { downloadItems, user } = useUser() ;
    
	const navigate = useNavigate() ;
	const [displayPopoutMenu, setDisplayPopoutMenu] = useState(false) ; 


	const handleDisplayMenu = () => {
		setDisplayPopoutMenu(!displayPopoutMenu) ;
	}
	
	const handleAccountPreferences = () => {

		const formData = new FormData() ;
		formData.append('user_id', user.id)

		const xhr = new XMLHttpRequest() ;
		xhr.open("POST", "/get_user", false) ;
		xhr.send(formData) ;

		let data = JSON.parse(xhr.response)

		let options = {
			'operation': 'Edit',
			'userInfo': data.user
		} 
		
		navigate('/account-preferences', { state: { options } })
	}
	
	const handleContactUs = () => {
		navigate('/support') ;
	}

	const downloadAllItems = () => {

		const data = downloadItems()
		
		const element = document.createElement("a") ;
		const file = new Blob(data, {
			type: "text/plain"
		}) ;
		element.href = URL.createObjectURL(file) ;
		element.download = "myFile.txt" ;
		document.body.appendChild(element) ;
		element.click() ;
	}


	return (
	// Start actual code.
		<div className='flex items-center justify-end'>
			<UserCircleIcon className='h-xsmall-logo md:h-small-logo w-small-logo mx-6 cursor-pointer' onClick={handleDisplayMenu} />
          
			{displayPopoutMenu && 
              <div className=' fixed z-[-4] top-[4.25rem] right-0 min-h-popout-menu h-auto md:min-w-popout-menu min-w-popout-menu-mobile mid:max-w-third max-w-half w-auto bg-sky-200 rounded-3xl rounded-r-none' > 
              	<div className='grid grid-rows-5 grid-cols-1 p-6 h-full max-w-full'> 
              	{/* Logout Button */}
              	<div className='w-full h-full flex items-center justify-end row-span-1 my-2'>
              		< Button
              		height="h-small-button"
              		color='bg-sky-400'
              		buttonText='Logout'
              		textColor='text-c-white'
              		hoverColor='hover:bg-sky-500'
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
              		<div className='flex items-center justify-end row-span-1 my-2'>
              			<UserLinks text={"Download All Items"} handleClick={downloadAllItems} />
              		</div>
						
              		<div className='md:hidden flex items-center justify-end row-span-1 my-2'>
              			<Button
              				height="h-xsmall-button"
              				color='bg-sky-400'
              				buttonText='Add Item'
              				textColor='text-c-white'
              				hoverColor='hover:bg-sky-500'
              				disable={false}
              				onClick={handleAddItem}
              			/>
              		</div>
              	</div>
					

              </div>
			}   
		</div >
      
        
	// End code.
	)
}

export default PopoutMenu