import React, { useState } from 'react' ;


const PhoneField = ({ size, setPhone, handleValid, required, ...rest }) => {

	// * copy the line below to parent component and pass "phone and setPhone" as parameters
	// const [phone, setPhone] = useState('');
	const [phoneErr, setPhoneErr] = useState(false) ;

	const handlePhoneChange = (e) => {

		// prevent page refresh
		e.preventDefault() ;
      
		let phone = e.target.value ;
    
		// Check for phone number format: A##-###-####. A cannot equal 0 or 1.
		let regex = /^[2-9]\d{2}\d{3}\d{4}$$/ ;
    
		// Credit: Steven Smith (https://regexlib.com/(X(1)A(yz5RUQ61QlGKIFsJk-Qn5Bjk_ly3umfiv1HisldIensSWhCoZjWEmytlHO5_oK0FQsICLxp7ybabpt8vINZDOosNDCwd5Q0nEOt0LR9pLGbO1hWkVbITJf5wlLhO_PwgawF1IED4af3m9rLmfOiTIC9uhVBNWgHE230rwRksZ4IDNKcdo09rb82uVOUF--je0))/REDetails.aspx?regexp_id=22)
  
		if (required || phone !== '') {
			// If format is valid, set phone; else, return error.
			if (regex.test(phone)) {
				setPhoneErr(false) ;
				setPhone(phone) ;
				handleValid(true) ;
			}
			else {
				setPhoneErr(true) ;
				handleValid(false);
				if (rest.storedVal != null) {
					rest.storedVal = phone;
				}
			}
		} else {
			setPhone(phone) ;
			setPhoneErr(false) ;
			handleValid(true);
			if (rest.storedVal != null) {
				rest.storedVal = phone;
			}
		}
	}

	return (
	// Start actual code.
		<span className='grid grid-rows-7 mx-6'>
			<label className='row-span-3 mb-2 flex items-center justify-start'>
       Phone Number :
			</label>
			<div className='rows-span-3 mb-2 flex items-center justify-center mx-2'>
				<input
					type="tel"
					onChange={handlePhoneChange}
					size={size}
					defaultValue={ rest.storedVal != null && rest.storedVal}
					/>
			</div>

			{/* If phone number not valid format, display error.  */}
			{phoneErr &&
          <div className='flex items-end justify-center mx-3 text-red-500 text-sm p-4'>
            Invalid Phone Number! Please enter in the format: ########## or erase completely.
          </div>  
			}
      
			{/* End code. */}
		</span>
     
	)
}

export default PhoneField