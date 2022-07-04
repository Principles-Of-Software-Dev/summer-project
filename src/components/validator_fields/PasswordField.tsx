import React, { useState } from 'react'


const PasswordField = () => {

    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState(false);
    
    const handlePasswordChange = (e) => {
    
      // Prevent page refresh.
      e.preventDefault();
      
      let pass = e.target.value;
    
      // Check for password for at least 6-12 chars, one uppercase,
      // one lowercase, one number, and one special character.
      let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

      // Source : Steve Smith (https://regexlib.com/(X(1)A(yz5RUQ61QlGKIFsJk-Qn5Bjk_ly3umfiv1HisldIensSWhCoZjWEmytlHO5_oK0FQsICLxp7ybabpt8vINZDOosNDCwd5Q0nEOt0LR9pLGbO1hWkVbITJf5wlLhO_PwgawF1IED4af3m9rLmfOiTIC9uhVBNWgHE230rwRksZ4IDNKcdo09rb82uVOUF--je0))/REDetails.aspx?regexp_id=31)
      
    
      // If format is valid, set password; else, return error.
      if ( regex.test(pass) ) {
        setPasswordErr(false);
        setPassword(pass);
      }
      else {
        setPasswordErr(true);
      }
    
    }

  return (
    // Start actual code.
    <span className='grid grid-rows-7'>
      <label className='row-span-3 mb-2 flex items-center justify-center'>
        Password :
      </label>
      {/*  */}
      <div className='rows-span-3 mb-2 flex items-center justify-center mx-3'>
        <input
          type="password"
          onBlur={handlePasswordChange}
          required
          />
      </div>

      {/* If password not valid format, display error.  */}
      {passwordErr &&
          <div className='flex items-end justify-center mx-3 text-red-500 text-sm'>
            Invalid Password!
          </div>  
      }
      
      {/* End code. */}
      </span>
      
  )
}

export default PasswordField;