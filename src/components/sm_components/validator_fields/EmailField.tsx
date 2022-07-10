import React, { useState } from 'react'


const EmailField = ({size}) => {

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    
    const handleEmailChange = (e) => {
    
      e.preventDefault();
      
      let email = e.target.value;
    
      // Check for email format
      let regex = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
      
      // Credit: Eric Lebetsamer (https://regexlib.com/(X(1)A(yz5RUQ61QlGKIFsJk-Qn5Bjk_ly3umfiv1HisldIensSWhCoZjWEmytlHO5_oK0FQsICLxp7ybabpt8vINZDOosNDCwd5Q0nEOt0LR9pLGbO1hWkVbITJf5wlLhO_PwgawF1IED4af3m9rLmfOiTIC9uhVBNWgHE230rwRksZ4IDNKcdo09rb82uVOUF--je0))/REDetails.aspx?regexp_id=35)
    
      // If format is valid, set email; else, return error.
      if ( regex.test(email) ) {
        setEmailErr(false);
        setEmail(email);
      }
      else {
        setEmailErr(true);
      }
    
    }

  return (

    // Start actual code.
    <span className='grid grid-rows-7 mx-6'>
      <label className='row-span-3 mb-2 flex items-center justify-start'>
        Email* :
      </label>
      <div className='rows-span-3 mb-2 flex items-center justify-start mx-3'>
        <input
          type="email"
          onBlur={handleEmailChange}
          required
          size={size}
          />
      </div>

      {/* If email not valid format, display error.  */}
      {emailErr &&
          <div className='flex items-end justify-center mx-3 text-red-500 text-sm'>
            Invalid email!
          </div>  
      }
      
      {/* End code. */}
      </span>
      
  )
}

export default EmailField