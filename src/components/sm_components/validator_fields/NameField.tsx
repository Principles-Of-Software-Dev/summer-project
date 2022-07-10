import React, { useState } from 'react'


const NameField = ({size}) => {

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState(false);
    
    const handleNameChange = (e) => {
      
      // Prevents page refresh.
      e.preventDefault();
      
      let name = e.target.value;
    
      // No validation other than empty field

      // If field is filled, set name; else, return error.
      if ( name === '') {
        setNameErr(true);
      }
      else {
        setNameErr(false);
        setName(name);
      }
    
    }

  return (

    // Start actual code.
    <span className='grid grid-rows-7 mx-6'>
      <label className='row-span-3 mb-2 flex items-center justify-start'>
        Name* :
      </label>
      <div className='rows-span-3 mb-2 flex items-center justify-start mx-3'>
        <input
          type="name"
          onBlur={handleNameChange}
          required
          size={size}
          />
      </div>

      {/* If name not valid format, display error.  */}
      {nameErr &&
          <div className='flex items-end justify-center mx-3 text-red-500 text-sm'>
            Please enter in a name!
          </div>  
      }
      
      {/* End code. */}
      </span>
      
  )
}

export default NameField