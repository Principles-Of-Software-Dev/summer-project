import React from 'react'
import Button from '../sm_components/Button'
import { useUser } from '../../global/authorization/UserContext'

const LogoutConfirmation = ({ setDisplay }) => {
	const { userLogout } = useUser() ;
	return (
		<div>
			<div className='absolute  top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] h-auto w-auto border bg-sky-300 rounded-lg border-solid border-black drop-shadow-md'>
				<div className='w-full h-full grid grid-row-2 p-6'>
					<p className='flex items-center justify-center w-full my-2'> Logout?</p>
					<div className='flex items-center justify-evenly my-2'>
						<Button
							height="h-xsmall-button"
							color='bg-sky-400'
							buttonText='Logout'
							textColor='text-c-white'
							hoverColor='hover:bg-sky-500'
							disable={false}
							onClick={userLogout}
						/>
						<Button
							height="h-xsmall-button"
							color='bg-sky-400'
							buttonText='Cancel'
							textColor='text-c-white'
							hoverColor='hover:bg-sky-500'
							disable={false}
							onClick={setDisplay}
						/>
					</div>

				</div>
			</div>
		</div>
	)
}

export default LogoutConfirmation