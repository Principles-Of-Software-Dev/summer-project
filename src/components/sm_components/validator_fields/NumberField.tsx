import React, { useState } from 'react'

const NumberField = ({ min_numb_length, max_numb_length, setNumb, handleValid, type,  required, ...rest }) => {

	const [numbErr, setNumbErr] = useState(false) ;


	const handleNumbChange = (e) => {

		// prevent page refresh
		e.preventDefault() ;
      
		let numb = e.target.value ;
  
		// If text isn't as long as expected, return error.
		// Leave room for error in math.
		if (required || (numb !=='')) {
			if (numb.length < min_numb_length || numb.length > max_numb_length) {
				setNumbErr(true) ;
				handleValid(false) ;
			}
			else {
				setNumbErr(false) ;
				setNumb(numb) ;
				handleValid(true) ;
			}
		} else { 
			setNumbErr(false) ;
			setNumb(numb) ;
			handleValid(true) ;
		}
	}

	return (
	// Start actual code.
		<span className='grid grid-rows-7 w-full mx-6'>
			<label className='row-span-3 mb-2 flex items-center justify-start'>
				{ type } :
			</label>
			<div className='rows-span-3 mb-2 flex items-center justify-start mx-2'>
				
				<input
					type="number"
					onChange={handleNumbChange}
					required
					size={max_numb_length}
					className='w-full'
					defaultValue={ rest.storedVal != null && rest.storedVal}
					/>
			</div>

			{/* If Text number not valid format, display error.  */}
			{numbErr &&
          <div className='flex items-end justify-center mx-3 text-red-500 text-sm p-4'>
					{type} must be at least {min_numb_length} characters and no longer than {max_numb_length}.
          </div>  
			}
      
			{/* End code. */}
		</span>
     
	)
}

export default NumberField