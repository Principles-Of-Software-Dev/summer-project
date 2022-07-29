import React, { useState } from 'react' ;
import { MenuIcon, XIcon } from '@heroicons/react/outline' ;
import Button from '../sm_components/Button' ;
import EmailField from '../sm_components/validator_fields/EmailField' ;
import NameField from '../sm_components/validator_fields/NameField' ;
import PasswordField from '../sm_components/validator_fields/PasswordField' ;
import AgeCheck from '../sm_components/validator_fields/AgeCheck' ;
import { useNavigate } from 'react-router-dom' ;
import { useUser } from '../../global/authorization/UserContext' ;


// @TODO cleanup and restructure code. Create components for long sections.

const MobileMenu = () => {

	// login and registration functionality
	const [loginEmail, setLoginEmail] = useState('') ;
	const [validLoginEmail, setValidLoginEmail] = useState(false) ;
	const [loginPassword, setLoginPassword] = useState('') ;
	const [validLoginPassword, setValidLoginPassword] = useState(false) ;
    

	const [regEmail, setRegEmail] = useState('') ;
	const [validRegEmail, setValidRegEmail] = useState(false) ;
	const [regFirstName, setRegFirstName] = useState('') ;
	const [regLastName, setRegLastName] = useState('') ;
	const [validRegName, setValidRegName] = useState(false) ;
	const [regPassword, setRegPassword] = useState('') ;
	const [validRegPassword, setValidRegPassword] = useState(false) ;
	const [validAgeCheck, setValidAgeCheck] = useState(false) ;

	const { userLogin, userRegistration } = useUser() ;
	const navigate = useNavigate() ;

	const handleNavigate = (page:string, check:boolean) => {

		if (check) {
			navigate(page) ;
		}
	}

	const handleValidLogin = () => {
           
		if (validLoginEmail && validLoginPassword ) {
			return false ;
		} else {
			return true ;
		}
	} 
    
	const handleValidRegistration = () => {
		// Require phone to be valid if added.
		
		if (validRegEmail && validRegName && validRegPassword && validAgeCheck) {
			return false ;
		}
		else {
			return true ;
		}
            
	}
   

	// Logic functions to control when menu and what hamburger menu displays.
	const [menu, setMenu] = useState(false) ;
	const handleClickMenu = () => {
		setMenu(!menu) ;
		if (login) {
			setLogin(!login) ;
		}
		if (register) {
			setRegister(!register) ;
		}
	}

	const [login, setLogin] = useState(false) ;
	const handleClickLogin = () => setLogin(!login) ;

	const [register, setRegister] = useState(false) ;
	const handleClickRegister = () => setRegister(!register) ;


	return (
		<div>

			{/* Start actual code. */}
			<div className='md:hidden'>
				<div onClick={handleClickMenu}>

					{/* Display dropdown nav when hamburger menu clicked */}
					{!menu ? <MenuIcon className='h-xsmall-logo w-xsmall-logo mx-6 cursor-pointer' /> :
						<div>
							<XIcon className='h-xsmall-logo w-xsmall-logo mx-4 cursor-pointer' />
						</div>
					}
				</div>
                    
				{menu &&
                    <div className='absolute top-[4.5rem] left-0 w-dropdown-menu-mobile bg-zinc-200 '>

                    	{/* Display "Login" and "Register" buttons or forms */}
                    	{(!login && !register) &&
                            <div className='h-dropdown-menu-login flex items-center justify-center '>
                            	<Button
                            		height="h-small-button"
                            		color='bg-zinc-400'
                            		buttonText='Login'
                            		textColor='text-c-white'
                            		hoverColor='hover:bg-zinc-500'
                            		disable={false}
                            		onClick={handleClickLogin}
                            	/>

                            	<Button
                            		height="h-small-button"
                            		color='bg-zinc-400'
                            		buttonText='Register'
                            		textColor='text-c-white'
                            		hoverColor='hover:bg-zinc-500'
                            		disable={false}
                            		onClick={handleClickRegister}
                            	/>
                            </div>
                            
                    	}
                        
                    	{(login && !register) &&
                            <div className='min-h-dropdown-menu-login max-h-dropdown-menu-mobile h-auto ' >
                            	<div className="grid grid-rows-5">
                            		{/* Email field */}
                            		<div className='row-span-2 my-4 flex items-center justify-center'>
                            			< EmailField size={15} required={true} setEmail={setLoginEmail } handleValid={setValidLoginEmail} />
                            		</div>

                            		{/* Password field */}
                            		<div className='row-span-2 flex items-center justify-center'>
                            			< PasswordField size={15} required={true} setPassword={setLoginPassword} handleValid={setValidLoginPassword} />
                            		</div>

                            		{/* "Submit" and "Cancel Button" */} 
                            		<div className='row-span-1 flex items-center justify-center mb-2 mx-2'>
                            			< Button 
                            				height="h-xsmall-button"
                            				color='bg-zinc-400'
                            				buttonText='Submit'
                            				textColor='text-c-white'
                            				hoverColor='hover:bg-zinc-500'
                            				disable={handleValidLogin()}
                            				onClick={() => userLogin(loginEmail, loginPassword)}
                            			/>

                            			< Button
                            				height="h-xsmall-button"
                            				color='bg-zinc-400'
                            				buttonText='Cancel'
                            				textColor='text-c-white'
                            				hoverColor='hover:bg-zinc-500'
                            				disable={false}
                            				onClick={handleClickLogin}
                            			/>
                                            
                            			<Button
                            				height="h-xsmall-button"
                            				color='bg-zinc-400'
                            				buttonText='Forgot Password'
                            				textColor='text-c-white'
                            				hoverColor='hover:bg-zinc-500'
                            				disable={false}
                            				onClick = {() => handleNavigate("/support" , login)}
                            			/>  
                            		</div>

                            	</div>
                            </div>
                    	}

                    	{(!login && register) &&
							<div className='min-h-dropdown-menu-login max-h-dropdown-menu-mobile-register h-auto '>
								<div className='grid grid-rows-6'>
                            	{/* Email field */}
                            	<div className='row-span-1 my-2 flex items-center justify-center'>
                            		< EmailField size={15} required={true} setEmail={setRegEmail} handleValid={setValidRegEmail} />
                            	</div>

                            	{/* Name field */}
                            	<div className='row-span-1 my-2 flex items-center justify-center'>
										< NameField size={15} required={true} setName={setRegFirstName} handleValid={setValidRegName} type={"First"} />
									</div>
									
									<div className='row-span-1 my-2 flex items-center justify-center'>
										< NameField size={15} required={true} setName={setRegLastName} handleValid={setValidRegName} type={"Last"} />
									</div>

                            	{/* Password field */}
                            	<div className='row-span-1 my-2 flex items-center justify-center'>
                            		< PasswordField size={15} required={true} setPassword={ setRegPassword} handleValid={setValidRegPassword}/>
                            	</div>
                                    
                            	{/* Age Check */}
                            	<div className='row-span-1 my-2 flex items-center justify-center'>
										<AgeCheck handleValid={setValidAgeCheck} />
                            	</div>

                            	{/* "Submit" and "Cancel Button" */} 
                            	<div className='row-span-1 flex items-center justify-between mb-2 mx-2'>
                            		< Button 
                            			height="h-xsmall-button"
                            			color='bg-zinc-400'
                            			buttonText='Submit'
                            			textColor='text-c-white'
                            			hoverColor='hover:bg-zinc-500'
                            			disable={handleValidRegistration()}
                            			// set later
                            			onClick={ () => userRegistration(regFirstName, regLastName, regEmail, regPassword) }
                            		/>

                            		< Button
                            			height="h-xsmall-button"
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
                        
                    </div>
				}
            
			</div>
			{/* End code. */}

		</div>
        
	)
}

export default MobileMenu