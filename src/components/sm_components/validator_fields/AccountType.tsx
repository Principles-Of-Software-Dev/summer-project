import React from 'react'

const AccountType = ({ setType }) => {

	const handleAccountChange = (e) => {
		console.log(e.target.value)
		setType(e.target.value) ;
	}    

	return (
		<div className=" px-2 w-most flex items-center justify-between">
			<div className='flex justify-start'>
				<label htmlFor='account_type'> Please select your account type: </label>
			</div>
			<div className=' flex justify-end'>
				<input type="radio" name="account_type" value="false" onChange={handleAccountChange} className='mx-2'/> Resident
				<input type="radio" name="account_type" value="true" onChange={handleAccountChange} className='mx-2' /> Caretaker
			</div>
		</div>
	)
}

export default AccountType