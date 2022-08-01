import React, { useState } from 'react'


const NameField = ({ size, required, setName, handleValid, type, ...rest }) => {

	// * copy the line below to parent component and pass "name and setName" as parameters
	//  const [name, setName] = useState('');
	const [nameErr, setNameErr] = useState(false) ;

	if (rest !== (null || undefined) && rest.storedVal !== (null || undefined) && rest.storedVal !== '') {
		handleValid(true) ;
	}

    
	const handleNameChange = (e) => {
      
		// Prevents page refresh.
		e.preventDefault() ;
      
		let name = e.target.value ;
    
		// No validation other than empty field

		// If field is filled, set name; else, return error.
		if (required || name !== '') {
			if (name === '') {
				handleValid(false) ;
				return true ;
			}
			else {
				setName(name) ;
				handleValid(true) ;
				if (nameErr) { setNameErr(false) }
				return false ;
			}
		} else {
			setName(name) ;
			handleValid(true) ;
			if (nameErr) { setNameErr(false) }
			return false ;
		}
	}

	const handleSetErrMsg = (e) => {

		setNameErr(handleNameChange(e)) ;
		
	}

	return (

	// Start actual code.
		<span className='grid grid-rows-7 mx-6 max-h-full w-full'>
			<label className='row-span-3 mb-2 flex items-center justify-start'>
				{type} Name * :
			</label>
			<div className='rows-span-3 mb-2 flex items-center justify-center mx-2'>
				<input
					type="name"
					onChange={handleNameChange}
					onBlur={handleSetErrMsg}
					required={required}
					placeholder={!required ? 'Optional': 'Required'}
					className="px-2 rounded-md w-most"
					defaultValue={ rest.storedVal != null ? rest.storedVal : null}
				/>
			</div>

			{/* If name not valid format, display error.  */}
			{nameErr &&
          <div className='flex items-end justify-center mx-3 text-red-500 text-sm p-4'>
            Please enter in a name!
          </div>  
			}
      
			{/* End code. */}
		</span>
      
	)
}

export default NameField