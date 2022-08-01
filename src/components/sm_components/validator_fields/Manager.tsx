import React from 'react'

const Manager = ({ handleValid, option }) => {
    
	const handleManager = (e) => {
		handleValid(e.target.checked) ;
	}

	return (
		<div className='max-w-most'> 
			<input
				type="checkbox"
				onClick={handleManager}
			/> <label className='mx-2'> {
				option === 'Add'? 
					'Add a Caretaker to your account?' :
					'Remove a Caretaker from your account?'
			}</label>
		</ div>
	)
}

export default Manager