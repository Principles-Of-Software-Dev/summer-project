import React from 'react'

const AgeCheck = ({ handleValid }) => {
    
	const handleAgeConsent = (e) => {
		handleValid(e.target.checked) ;
	}

	return (
		<div className='max-w-most'> 
			<input
				type="checkbox"
				onClick={handleAgeConsent}
			/> <label className='mx-2'> I am 18 years of age or older.</label>
		</ div>
	)
}

export default AgeCheck