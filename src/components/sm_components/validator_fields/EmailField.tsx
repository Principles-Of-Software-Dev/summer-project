import React, { useState } from 'react'


const EmailField = ({ size, required, setEmail, handleValid, text, ...rest }) => {

	// * copy the line below to parent component and pass "email and setEmail as parameters"
	// const [email, setEmail] = useState('');
	const [emailErr, setEmailErr] = useState(false) ;

	if (rest  != null) {
		handleValid(true) ;
	}

    
	const handleEmailChange = (e) => {
    
		e.preventDefault() ;
      
		let email = e.target.value ;
    
		// Check for email format
		let regex = /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/ ;
      
		// Credit: Eric Lebetsamer (https://regexlib.com/(X(1)A(yz5RUQ61QlGKIFsJk-Qn5Bjk_ly3umfiv1HisldIensSWhCoZjWEmytlHO5_oK0FQsICLxp7ybabpt8vINZDOosNDCwd5Q0nEOt0LR9pLGbO1hWkVbITJf5wlLhO_PwgawF1IED4af3m9rLmfOiTIC9uhVBNWgHE230rwRksZ4IDNKcdo09rb82uVOUF--je0))/REDetails.aspx?regexp_id=35)
    
		// If format is valid, set email; else, return error.
		if (required || email !== '') {
			if (regex.test(email)) {
				setEmail(email) ;
				handleValid(true) ;
				if (emailErr) { setEmailErr(false) }
				return false ;
			}
			else {
				handleValid(false) ;
				return true ;
			}
		} else {
			setEmail(email) ;
			if (emailErr) { setEmailErr(false) }
			handleValid(true) ;
			return false ;
		}
    
	}

	const handleSetErrMsg = (e) => {
		setEmailErr(handleEmailChange(e)) ;
	}

	return (

	// Start actual code.
		<span className='grid grid-rows-7 mx-6 max-h-full w-full '>
			<label className='row-span-3 mb-2 flex items-center justify-start'>
				{text} {required && '*'} :
			</label>
			<div className='rows-span-3 mb-2 flex items-center justify-center mx-2 max-w-full' >
				<input
					type="email"
					onChange={handleEmailChange}
					onBlur={handleSetErrMsg}
					required={required}
					placeholder={!required ? 'Optional': 'Required'}
					className="px-2 rounded-md w-most"
					defaultValue={ rest.storedVal != null ? rest.storedVal : null}
				/>
			</div>

			{/* If email not valid format, display error.  */}
			{emailErr &&
          <div className='flex items-end justify-center mx-3 text-red-500 text-sm p-4'>
            Email is not in the correct format!
          </div>  
			}
      
			{/* End code. */}
		</span>
      
	)
}

export default EmailField