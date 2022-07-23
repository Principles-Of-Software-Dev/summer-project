import React, { useState } from 'react'
import Button from '../../sm_components/Button'
import DescriptionField from '../../sm_components/validator_fields/DescriptionField'
import EmailField from '../../sm_components/validator_fields/EmailField'
import NameField from '../../sm_components/validator_fields/NameField'
import TitleField from '../../sm_components/validator_fields/TitleField'
import { useUser } from '../../../global/authorization/UserContext'



const SupportForm = () => {

	const [description, setDescription] = useState('') ;
	const [validDescription, setValidDescription] = useState(false) ;
	const [email, setEmail] = useState('') ;
	const [validEmail, setValidEmail] = useState(false) ;
	const [name, setName] = useState('') ;
	const [validName, setValidName] = useState(false) ;
	const [title, setTitle] = useState('') ;
	const [validTitle, setValidTitle] = useState(false);
	
	const { test } = useUser() ;


	const handleCompleteForm = () => {

		if (validDescription && validEmail && validName && validTitle ) {
			return false ;
		} else {
			return true ;
		}
	}

	
	return (
		<div className='flex items-center justify-center w-full h-full'>
			{/* Start actual code. */}
			<div className='grid grid-cols-2 grid-rows-6 w-[] h-main bg-zinc-200'>
				<p className='flex items-center justify-center row-span-1 col-span-2'>
                  Send Help Request
				</p>

				<div className='lg:hidden flex items-center justify-center row-span-1 '>
					<NameField size={15} name={name} setName={setName} handleValid={setValidName} />
				</div>
				<div className='lg:flex hidden items-center justify-center row-span-1 '>
					<NameField size={22} name={name} setName={setName} handleValid={setValidName}/>
				</div>

				<div className='lg:hidden flex items-center justify-center row-span-1'>
					<EmailField size={15} email={email} setEmail={setEmail} handleValid={setValidEmail}/>
				</div>
				<div className='lg:flex hidden items-center justify-center row-span-1'>
					<EmailField size={22} email={email} setEmail={setEmail} handleValid={setValidEmail}/>
				</div>

				<div className='flex items-center justify-center row-span-2 col-span-2'>
					<TitleField title_length={10} title={title} setTitle={setTitle} handleValid={setValidTitle} />
				</div>
				<div className='flex items-center justify-center row-span-2 col-span-2'>
					<DescriptionField description_length={50} description={description} setDescription={setDescription} handleValid={setValidDescription} />
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
                  
				</div>


          
          
			</div>
			{/* End code. */}
		</div>
      
	)
}

export default SupportForm