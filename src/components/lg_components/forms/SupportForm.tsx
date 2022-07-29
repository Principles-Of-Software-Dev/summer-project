import React, { useState } from 'react'
import Button from '../../sm_components/Button'
import TextField from '../../sm_components/validator_fields/TextField'
import EmailField from '../../sm_components/validator_fields/EmailField'
import NameField from '../../sm_components/validator_fields/NameField'
import PhoneField from '../../sm_components/validator_fields/PhoneField'
import { useUser } from '../../../global/authorization/UserContext'
import { useNavigate } from 'react-router-dom' ;



const SupportForm = () => {

	const [text, setText] = useState('') ;
	const [validText, setValidText] = useState(false) ;
	const [email, setEmail] = useState('') ;
	const [validEmail, setValidEmail] = useState(false) ;
	const [firstName, setFirstName] = useState('') ;
	const [lastName, setLastName] = useState('') ;
	const [validName, setValidName] = useState(false) ;
	const [title, setTitle] = useState('') ;
	const [validTitle, setValidTitle] = useState(false) ;
	const [phone, setPhone] = useState('') ;
	const [validPhone, setValidPhone] = useState(false) ;
	const navigate = useNavigate() ;
	
	const { test } = useUser() ;


	const handleCompleteForm = () => {

		if (validText && validEmail && validName && validTitle && validPhone) {
			return false ;
		} else {
			return true ;
		}
	}

	
	return (
		<div className='flex items-center justify-center w-full h-full'>
			{/* Start actual code. */}
			<div className='grid grid-cols-2 grid-rows-7 w-auto h-main bg-zinc-200'>
				<p className='flex items-center justify-center row-span-1 col-span-2'>
                  Send Help Request
				</p>

				{/* Name Fields */}
				<div className='lg:hidden flex items-center justify-center row-span-1 col-span-2' >
					< NameField size={15} required={true} setName={setFirstName} handleValid={setValidName} type={"First"} />
					< NameField size={15} required={true} setName={setLastName} handleValid={setValidName } type={"Last"}/>
				</div>
				<div className='lg:flex hidden items-center justify-center row-span-1 col-span-2'>
					< NameField size={22} required={true} setName={setFirstName} handleValid={setValidName} type={"First"} />
					< NameField size={22} required={true} setName={setLastName} handleValid={setValidName } type={"Last"}/>
				</div>

				{/* Email Field */}
				<div className='lg:hidden flex items-center justify-center row-span-1 col-span-1'>
					<EmailField size={15} required={true} setEmail={setEmail} handleValid={setValidEmail}/>
				</div>
				<div className='lg:flex hidden items-center justify-center row-span-1 col-span-1'>
					<EmailField size={22} required={true} setEmail={setEmail} handleValid={setValidEmail}/>
				</div>

				{/* Phone Field */}
				<div className='lg:hidden flex items-center justify-center row-span-1 col-span-1'>
					< PhoneField size={15} setPhone={setPhone} required={true} handleValid={setValidPhone}  />
				</div>
				<div className='lg:flex hidden items-center justify-center row-span-1 col-span-1'>
					< PhoneField size={22} setPhone={setPhone} required={true} handleValid={setValidPhone}  />
				</div>

				{/* Title */}
				<div className='flex items-center justify-center row-span-2 col-span-2'>
					<TextField text_length={22} required={true} setText={setTitle} handleValid={setValidTitle} type={"Title"} largeArea={false} />
				</div>
				{/* Message */}
				<div className='flex items-center justify-center row-span-2 col-span-2'>
					<TextField text_length={50} required={true} setText={setText} handleValid={setValidText} type={"Message"} largeArea={true} />
				</div>
				<div className='flex items-center justify-end row-span-1 col-span-2 mx-4 my-2'>
					<Button
						height="h-xsmall-button"
						color='bg-zinc-400'
						buttonText='Submit'
						textColor='text-c-white'
						hoverColor='hover:bg-zinc-500'
						disable={false}
						// set later
						onClick={test}
					/>
					<Button
						height="h-xsmall-button"
						color='bg-zinc-400'
						buttonText='Cancel'
						textColor='text-c-white'
						hoverColor='hover:bg-zinc-500'
						disable={false}
						// set later
						onClick={() => navigate(-1)}
					/>
                  
				</div>


          
          
			</div>
			{/* End code. */}
		</div>
      
	)
}

export default SupportForm