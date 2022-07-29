import React, { useState } from 'react'


const PasswordField = ({ size , required, setPassword, handleValid }) => {

	// * copy the line below to parent component and pass "password and setPassword as parameters"
	// const [password, setPassword] = useState('');
  
	const [passwordErr, setPasswordErr] = useState(false) ;
    
	const handlePasswordChange = (e) => {
    
		// Prevent page refresh.
		e.preventDefault() ;
      
		let pass = e.target.value ;
    
		// Check for password for at least 6-12 chars, one uppercase,
		// one lowercase, one number, and one special character.
		let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{6,12}$/ ;

		// Source(modified) : Steve Smith (https://regexlib.com/(X(1)A(yz5RUQ61QlGKIFsJk-Qn5Bjk_ly3umfiv1HisldIensSWhCoZjWEmytlHO5_oK0FQsICLxp7ybabpt8vINZDOosNDCwd5Q0nEOt0LR9pLGbO1hWkVbITJf5wlLhO_PwgawF1IED4af3m9rLmfOiTIC9uhVBNWgHE230rwRksZ4IDNKcdo09rb82uVOUF--je0))/REDetails.aspx?regexp_id=31)
      
    
		// If format is valid, set password; else, return error.
		if (required || pass !== '') {
			if (regex.test(pass)) {
				setPassword(pass) ;
				handleValid(true) ;
				if (passwordErr){ setPasswordErr(false) }
				return false ;
			}
			else {
				handleValid(false) ;
				return true ;
			}
		} else {
			if (passwordErr){ setPasswordErr(false) }
			setPassword(pass) ;
			handleValid(true) ;
			return false ;
		 }
    
	}

	const handleSetErrMsg = (e) => {
		setPasswordErr(handlePasswordChange(e)) ;
	}

	return (
	// Start actual code.
		<span className='grid grid-rows-7 mx-6'>
			<label className='row-span-3 mb-2 flex items-center justify-start'>
        Password* :
			</label>
			<div className='rows-span-3 mb-2 flex items-center justify-start mx-2 flex-wrap'>
				<input
					type="password"
					onChange={handlePasswordChange}
					onBlur={handleSetErrMsg}
					required
					size={size}
				/>
				{passwordErr &&
          <div className='max-w-full flex items-end justify-center mx-3 text-red-500 text-sm p-4 '>
            Password must be 6-12 characters and contain at least 1 upper-case letter, 1 lower-case letter, 1 number, and 1 special character!
          </div>  
				}
			</div>

			{/* If password not valid format, display error.  */}
     
      
			{/* End code. */}
		</span>
      
	)
}

export default PasswordField ;