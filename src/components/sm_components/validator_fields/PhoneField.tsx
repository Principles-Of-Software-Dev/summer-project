import React, { useState } from 'react';


const PhoneField = ({ size }) => {

  const [phone, setPhone] = useState('');
  const [phoneErr, setPhoneErr] = useState(false);

  const handlePhoneChange = (e) => {

    // prevent page refresh
    e.preventDefault();
      
    let phone = e.target.value;
    
    // Check for phone number format: A##-###-####. A cannot equal 0 or 1.
    let regex = /^[2-9]\d{2}\d{3}\d{4}$$/;
    
    // Credit: Steven Smith (https://regexlib.com/(X(1)A(yz5RUQ61QlGKIFsJk-Qn5Bjk_ly3umfiv1HisldIensSWhCoZjWEmytlHO5_oK0FQsICLxp7ybabpt8vINZDOosNDCwd5Q0nEOt0LR9pLGbO1hWkVbITJf5wlLhO_PwgawF1IED4af3m9rLmfOiTIC9uhVBNWgHE230rwRksZ4IDNKcdo09rb82uVOUF--je0))/REDetails.aspx?regexp_id=22)
  
    // If format is valid, set phone; else, return error.
    if ( regex.test(phone) ) {
      setPhoneErr(false);
      setPhone(phone);
    }
    // Enables "optional" entry
    else if (phone === '') {
      setPhoneErr(false);
    }
    else {
      setPhoneErr(true);
    }
  }

  return (
    // Start actual code.
    <span className='grid grid-rows-7 mx-6'>
      <label className='row-span-3 mb-2 flex items-center justify-start'>
       Phone Number :
      </label>
      <div className='rows-span-3 mb-2 flex items-center justify-center mx-3'>
        <input
          type="tel"
          onBlur={handlePhoneChange}
          size={size}
          />
      </div>

      {/* If phone number not valid format, display error.  */}
      {phoneErr &&
          <div className='flex items-end justify-center mx-3 text-red-500 text-sm'>
            Invalid Phone Number! Please enter in the format: ##########
          </div>  
      }
      
      {/* End code. */}
    </span>
     
  )
}

export default PhoneField