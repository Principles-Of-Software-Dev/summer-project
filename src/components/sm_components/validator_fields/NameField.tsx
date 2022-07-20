import React, { useState } from 'react'


const NameField = ({size, name, setName, handleValid}) => {

  // * copy the line below to parent component and pass "name and setName" as parameters
  //  const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState(false);
    
    const handleNameChange = (e) => {
      
      // Prevents page refresh.
      e.preventDefault();
      
      let name = e.target.value;
    
      // No validation other than empty field

      // If field is filled, set name; else, return error.
      if ( name === '') {
        setNameErr(true);
        handleValid(false);
      }
      else {
        setNameErr(false);
        setName(name);
        handleValid(true);
      }
    
    }

  return (

    // Start actual code.
    <span className='grid grid-rows-7 mx-6'>
      <label className='row-span-3 mb-2 flex items-center justify-start'>
        Name* :
      </label>
      <div className='rows-span-3 mb-2 flex items-center justify-start mx-2'>
        <input
          type="name"
          onChange={handleNameChange}
          required
          size={size}
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