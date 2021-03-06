import React, { useState } from 'react' ;
import { useUser } from '../../../global/authorization/UserContext' ;
import Button from '../../sm_components/Button' ;
import EmailField from '../../sm_components/validator_fields/EmailField' ;
import NameField from '../../sm_components/validator_fields/NameField' ;
import PasswordField from '../../sm_components/validator_fields/PasswordField' ;
import AgeCheck from '../../sm_components/validator_fields/AgeCheck' ;


const RegisterForm = ({ handleClickRegister, register }) => {

	// Registration Validation.
	const [email, setEmail] = useState('') ;
	const [validEmail, setValidEmail] = useState(false) ;
	const [firstName, setFirstName] = useState('') ;
	const [lastName, setLastName] = useState('') ;
	const [validName, setValidName] = useState(false) ;
	const [password, setPassword] = useState('') ;
	const [validPassword, setValidPassword] = useState(false) ;
	const [validAgeCheck, setValidAgeCheck] = useState(false) ;
	

	const { userRegistration } = useUser() ;
    

	const handleValidRegistration = () => {
        
		if (validEmail && validName && validPassword && validAgeCheck) {
			return false ;
		}
		else {
			return true ;
		}
		

	}
        

	return (
		<div>

			{/* Start actual code. */}
			<Button
				height="h-small-button"
				color='bg-zinc-400'
				buttonText='Register'
				textColor='text-c-white'
				hoverColor='hover:bg-zinc-500'
				disable={false}
				onClick={handleClickRegister}
			/>

			{/* dropdown login menu */}
			<form >
				{
					!register ? <div className='hidden'>
                    
						{/* Empty */}
					</div> :
                    
					// display menu
						<div className=' absolute right-0 top-[4.5rem] min-h-dropdown-menu-register max-h-dropdown-menu-mobile-register h-auto w-dropdown-menu min-w-[25rem] bg-zinc-100'>
							<div className='grid grid-rows-6 min-h-dropdown-menu-register max-h-dropdown-menu-mobile-register p-3'>
								{/* Email field */}
								<div className='row-span-1 my-4 flex items-center justify-center'>
									< EmailField size={25} email={email} setEmail={setEmail} handleValid={setValidEmail} />
								</div>

								{/* Name field */}
								<div className='row-span-1 flex items-center justify-center'>
									< NameField size={25} name={firstName} setName={setFirstName} handleValid={setValidName} type={"First"} />
								</div>
								<div className='row-span-1 flex items-center justify-center'>
									< NameField size={25} name={lastName} setName={setLastName} handleValid={setValidName } type={"Last"}/>
								</div>

								{/* Password field */}
								<div className='row-span-1 flex items-center justify-center'>
									< PasswordField size={25} password={password} setPassword={setPassword} handleValid={setValidPassword} />
								</div>
                          
								{/* Age Check*/}
								<div className='row-span-1 flex items-center justify-center w-full'>
									<AgeCheck handleValid={setValidAgeCheck} />
								</div>

								{/* "Submit" and "Cancel Button" */}
                            
								<div className='row-span-1 flex items-center justify-between mb-2 mx-2'>
									< Button 
										height="h-small-button"
										color='bg-zinc-400'
										buttonText='Submit'
										textColor='text-c-white'
										hoverColor='hover:bg-zinc-500'
										disable={handleValidRegistration()}
										// set later
										onClick={userRegistration}
									/>

									< Button
										height="h-small-button"
										color='bg-zinc-400'
										buttonText='Cancel'
										textColor='text-c-white'
										hoverColor='hover:bg-zinc-500'
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