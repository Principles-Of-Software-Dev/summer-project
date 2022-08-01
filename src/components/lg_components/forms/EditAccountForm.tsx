import React, { useState } from 'react'
import PasswordField from '../../sm_components/validator_fields/PasswordField' ;
import EmailField from '../../sm_components/validator_fields/EmailField' ;
import { useNavigate } from 'react-router-dom' ;
import TextField from '../../sm_components/validator_fields/TextField' ;
import NameField from '../../sm_components/validator_fields/NameField' ;
import NumberField from '../../sm_components/validator_fields/NumberField' ;
import Manager from '../../sm_components/validator_fields/Manager' ;
import Button from '../../sm_components/Button' ;
import { useUser } from '../../../global/authorization/UserContext' ;
import StateField from '../../sm_components/validator_fields/StateField' ;


const EditAccountForm = ({ option, userInfo }) => {
    
	const { userLogout, user } = useUser() ;

	const required = option === 'Setup' ? true : false ;      

	const navigate = useNavigate() ;
    
	// Login Info, Personal Info
	const [loginEmail, setLoginEmail] = useState(userInfo.email !== null ? userInfo.email : '') ;
	const [validLoginEmail, setValidLoginEmail] = useState(loginEmail != null ? true : false) ;
	const [password, setPassword] = useState('') ;
	const [validPassword, setValidPassword] = useState(false) ;
	const [firstname, setFirstname] = useState(userInfo.firstname != null ? 
		userInfo.firstname: '') ;
	const [lastname, setLastname] = useState(userInfo.lastname != null ? 
		userInfo.lastname: '') ;
	const [validName, setValidName] = useState(lastname && firstname != null ? true : false) ;

	// Address Info
	const [street, setStreet] = useState(userInfo.street != null ? 
		userInfo.street: '')
	const [validStreet, setValidStreet] = useState(street != null ? true : false) ;
	const [state, setState] = useState(userInfo.state != null ? 
		userInfo.state: '')
	const [validState, setValidState] = useState(state != null ? true : false) ;
	const [city, setCity] = useState(userInfo.city != null ? 
		userInfo.city: '')
	const [validCity, setValidCity] = useState(city != null ? true : false) ;
	const [zipcode, setZipCode] = useState(userInfo.zipcode != null ? 
		userInfo.zipcode: '')
	const [validZipcode, setValidZipcode] = useState(zipcode != null ? true : false) ;

	// Manager Stuff
	const [addManager, setAddManager] = useState(false) ;
	const [managerEmail, setManagerEmail] = useState('') ;
	const [validManagerEmail, setValidManagerEmail] = useState(false) ;
	
	const initialParams = {
		'loginEmail': userInfo.email,
		'firstname': userInfo.firstname,
		'lastname': userInfo.lastname,
		'street': userInfo.street,
		'city': userInfo.city,
		'state': userInfo.state,
		'zipcode': userInfo.zipcode,
	}

	const handleValidSubmit = () => {

		if (option === 'setup'){
			if (validLoginEmail && validName
                && validPassword && validStreet && validCity && validZipcode && validState
			) {
				if (addManager) {
					if (addManager) {
						if (!validManagerEmail) {
							return false ;
						} else {
							return true ;
						}
					}
				} else {
					return false ;
				}
			} else {
				return true ;
			} 
		} else
		{
			if (validLoginEmail && validName
                && validStreet && validCity && validZipcode
                && validState 
			) {
				if ((password !== '' && validPassword) || loginEmail != initialParams.loginEmail
                    || firstname != initialParams.firstname || lastname != initialParams.lastname || 
                    street != initialParams.street || city != initialParams.city || zipcode != initialParams.zipcode ||
                    state != initialParams.state
				) {
					return false
				}
				return true ;
			} else {
				return true ;
			}
		}
		return true ;
	}
    
	const handleSubmit = (e) => {

		if (loginEmail === initialParams.loginEmail) {
			setLoginEmail('')
		}
		if (firstname === initialParams.firstname) {
			setFirstname('')
		}
		if (lastname === initialParams.lastname) {
			setLastname('')
		}
		if (street === initialParams.street ) {
			setStreet('')
		}
		if (city === initialParams.city) {
			setCity('')
		}
		if (zipcode === initialParams.zipcode) {
			setZipCode('')
		}	
		if (state === initialParams.state) {
			setState('')
		}
		e.preventDefault()
		let formData = new FormData() ;

		formData.append('email', loginEmail)
		formData.append('password', password) ;
		formData.append('firstname', firstname) ;
		formData.append('lastname', lastname) ;
		formData.append('street', street) ;
		formData.append('city', city) ;
		formData.append('zipcode', zipcode) ;
		formData.append('state', state) ;
		formData.append('user_id', user.id)

		

	}

	return (
		<div className="h-full flex items-center justify-center ">
			<div className="h-main md:w-half w-most min-w-[20rem] bg-zinc-200 border border-solid rounded-lg">

				<div className=' p-3 max-h-full max-w-full'>
					<div className="h-auto p-3 max-h-full " >
						{/* Email Field Confirmation*/}
						<div className='w-full  flex items-center justify-center my-2 h-[5rem] '>
							<EmailField size={15} required={required} setEmail={setLoginEmail} handleValid={setValidLoginEmail} text={"Your Email"} storedVal={loginEmail}  />
						</div>
                        
						{/* Password Field */}
						<div className='w-full  flex items-center justify-center my-2 h-[5rem]'>
							<PasswordField size={15} required={required} setPassword={setPassword} handleValid={setValidPassword} text={"Please set a password"} />
						</div>

						<div className="grid grid-cols-2 grid-rows-3" >
                            
							{/* First Name Field */}
							<div className=' w-full flex items-center justify-center my-1 col-span-1 row-span-1 h-[5rem]'>
								< NameField size={15} required={required} setName={setFirstname} handleValid={setValidName} type={"First"} storedVal={firstname}/>
							</div>

							{/* Last Name Field */}
							<div className=' w-full flex items-center justify-center my-1 col-span-1 row-span-1 h-[5rem]'>
								< NameField size={15} required={required} setName={setLastname} handleValid={setValidName} type={"Last"} storedVal={lastname}/>
							</div>

							{/* Street */}
							<div className='w-full  flex items-center justify-center my-1 col-span-2 row-span-1 h-[5rem]'>
								<TextField text_length={10} required={required} setText={setStreet} handleValid={setValidStreet} type={"Street"} largeArea={false} storedVal={street}  />
							</div>
                            
							{/* City */}
							<div className='w-full flex items-center justify-center my-1 col-span-1 row-span-1 h-[5rem]'>
								<TextField text_length={10} required={required} setText={setCity} handleValid={setValidCity} type={"City"} largeArea={false} storedVal={city}  />
							</div>

							{/* State */}
							<div className=' w-full flex items-center justify-center my-1 col-span-1 row-span-1 h-[5rem]'>
								<StateField handleValid={setValidState} required={required} setState={setState} />
							</div>
                            

							{/* Zip */}
							<div className='w-full flex items-center justify-center my-1 col-span-2 row-span-1 h-[5rem]'>
                                
								<NumberField min_number_length={5} max_number_length={5} setNumb={setZipCode} handleValid={setValidZipcode} type={"Zip Code"} required={required} storedVal={zipcode} />

							</div>

							{/* Add Manager */}
							<div className='w-full flex items-center justify-center my-1 col-span-2 row-span-1 h-[5rem]'>
								<div className='row-span-1 w-full flex items-center justify-end'>
									<Manager handleValid={setAddManager} option={"Add"} />
								</div>
								{
									addManager &&
                                        <div className='row-span-2 w-full flex items-center justify-center'>
                                        	<EmailField size={15} required={required} setEmail={setManagerEmail} handleValid={setValidManagerEmail} text={"Your Caretaker's Email"} storedVal={managerEmail} />
                                        </div>
								}
							</div>
						</div>  

						{/* Cancel and Submit Buttons */}
						<div className="col-span-2 h-[5rem]">
							<div className='w-full flex items-center justify-end my-1'>
								<Button
                            		height="h-small-button"
                            		color='bg-zinc-400'
                            		buttonText='Submit'
                            		textColor='text-c-white'
                            		hoverColor='hover:bg-zinc-500'
                            		disable={handleValidSubmit()}
                            		onClick={handleSubmit}
                            	/>
								<Button
									height="h-small-button"
									color='bg-zinc-400'
									buttonText='Cancel'
									textColor='text-c-white'
									hoverColor='hover:bg-zinc-500'
									disable={false}
									onClick={() => {
										if (option === 'setup') {
											userLogout()
										} else {
											navigate(-1)
										}
									}}
                            	/>
							</div>
						
						</div>
					</div>
				</div>

			</div>

		</div>

	)
}

export default EditAccountForm