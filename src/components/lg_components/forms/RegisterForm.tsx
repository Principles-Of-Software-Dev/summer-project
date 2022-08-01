import React, { useState } from 'react' ;
import { useUser } from '../../../global/authorization/UserContext' ;
import Button from '../../sm_components/Button' ;
import EmailField from '../../sm_components/validator_fields/EmailField' ;
import NameField from '../../sm_components/validator_fields/NameField' ;
import AccountType from '../../sm_components/validator_fields/AccountType' ;


const RegisterForm = ({ handleClickRegister, register }) => {

	// Registration Validation.
	const [email, setEmail] = useState('') ;
	const [validEmail, setValidEmail] = useState(false) ;
	const [firstName, setFirstName] = useState('') ;
	const [lastName, setLastName] = useState('') ;
	const [validName, setValidName] = useState(false) ;
	const [accountType, setAccountType] = useState('')
	

	const { setupAccount } = useUser() ;
    

	const handleValidRegistration = () => {
        
		if (validEmail && validName && accountType !== '') {
			return false ;
		}
		else {
			return true ;
		}
		
	}

	const handleChangeAccountType = (str:string) => {
		setAccountType(str)
	}

	const handleSetupAccount = (e) => {
		e.preventDefault() ;
		const formData = new FormData() ;

		formData.append('email', email) ;
		formData.append('firstname', firstName) ;
		formData.append('lastname', lastName) ;
		formData.append('manager', accountType) ;
		
		setupAccount(formData) ;
	}
        

	return (
		<div>

			{/* Start actual code. */}
			<Button
				height="h-small-button"
				color='bg-sky-400'
				buttonText='Sign Up'
				textColor='text-c-white'
				hoverColor='hover:bg-sky-500'
				disable={false}
				onClick={handleClickRegister}
			/>

			{/* dropdown search menu */}
			<form >
				{
					!register ? <div className='hidden'>
                    
						{/* Empty */}
					</div> :
                    
					// display menu
						<div className=' absolute right-0 top-[4.5rem] min-h-[5rem]  h-auto w-dropdown-menu min-w-[25rem] bg-sky-200 bg-opacity-95 rounded-3xl rounded-r-none '>
							<div className='grid grid-rows-5 min-h-[5rem] max-h-dropdown-menu-mobile-register h-auto p-3'>
								{/* Email field */}
								<div className='row-span-1 my-4 flex items-center justify-center'>
									< EmailField size={25} required={true} setEmail={setEmail} handleValid={setValidEmail} text={"Enter your email"} />
								</div>

								{/* Name field */}
								<div className='row-span-1 flex items-center justify-center'>
									< NameField size={25} required={true} setName={setFirstName} handleValid={setValidName} type={"First"} />
								</div>
								<div className='row-span-1 flex items-center justify-center'>
									< NameField size={25} required={true} setName={setLastName} handleValid={setValidName } type={"Last"}/>
								</div>

								{/* Account Type field */}
                            	<div className='row-span-1 my-2 flex items-center justify-center'>
									< AccountType setType={handleChangeAccountType} />
                            	</div>

								{/* "Submit" and "Cancel Button" */}
                            
								<div className='row-span-1 flex items-center justify-between mb-2 mx-2'>
									< Button 
										height="h-small-button"
										color='bg-sky-400'
										buttonText='Submit'
										textColor='text-c-white'
										hoverColor='hover:bg-sky-500'
										disable={handleValidRegistration()}
										// set later
										onClick={handleSetupAccount}
									/>

									< Button
										height="h-small-button"
										color='bg-sky-400'
										buttonText='Cancel'
										textColor='text-c-white'
										hoverColor='hover:bg-sky-500'
										disable={false}
										onClick={handleClickRegister}
									/>
								</div>
							</div>
						</div>
				}
              
        
			</form>
			{/* End Code.  */}

		</div>
	)
}

export default RegisterForm