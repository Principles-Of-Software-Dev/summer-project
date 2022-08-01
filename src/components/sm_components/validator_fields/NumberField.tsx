
import React, { useState } from 'react' 

const NumberField = ({ min_number_length,max_number_length, setNumb, handleValid, type, required, ...rest }) => {
	

	// * copy the line below to parent component and pass "text and setText" as parameters
	// const [text, setText] = useState('');
	const [numbErr, setNumbErr] = useState(false) ;
	let initial = null ;

	if (rest !== (null || undefined) && rest.storedVal !== (null || undefined) && rest.storedVal !== '') {
		console.log("Running when Im not supposed to")
		handleValid(true) ;
	}

	const handleNumbChange = (e) => {

		// prevent page refresh
		e.preventDefault() ;
      
		let number = e.target.value ;
  
		// If text isn't as long as expected, return error.
		// Leave room for error in math.
		if (required || (number !=='')) {
			if (number.length < (min_number_length) || number.length > (max_number_length)) {

				if (rest.storedVal != null) {
					rest.storedVal = number ;
				}
				handleValid(false);
				setNumb(number.toString())
				return true ;
			}
			else {
				if (numbErr) { setNumbErr(false) }
				setNumb(number.toString()) ;
				handleValid(true) ;
				return false ;
			}
		} else { 
			if (numbErr) { setNumbErr(false) }
			setNumb(number.toString()) ;
			handleValid(true) ;
			return false ;
		}
	}

	const handleSetErrMsg = (e) => {
		setNumbErr(handleNumbChange(e)) ;
	}

	return (
	// Start actual code.
		<span className='grid grid-rows-7 w-full mx-6 max-h-full'>
			<label className='row-span-3 mb-2 flex items-center justify-start'>
				{ type } * :
			</label>
			<div className='rows-span-3 mb-2 flex items-center justify-start mx-2'>
				< input
					type="number"
					onChange={handleNumbChange}
					onBlur={handleSetErrMsg}
					required
					size={max_number_length}
					className='w-full px-2 rounded-md'
					defaultValue={rest.storedVal !== ( null||undefined ) ? rest.storedVal : null} />
			</div>

			{/* If Text number not valid format, display error.  */}
			{numbErr &&
          <div className='flex items-end justify-center mx-3 text-red-500 text-sm p-4'>
          	{type} must be at least {min_number_length} characters. {max_number_length !== min_number_length && "Cannot be more than { text_length * 3} characters."}
          </div>  
			}
      
			{/* End code. */}
		</span>
     
	)
}

export default NumberField