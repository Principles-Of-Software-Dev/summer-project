import React, { useState } from 'react';


const DescriptionField = ({description_length, description, setDescription, handleValid}) => {

  // * copy the line below to parent component and pass "description and setDescription" as parameters
  // const [description, setDescription] = useState('');
  const [descriptionErr, setDescriptionErr] = useState(false);
  const rows = 4;
  const cols = (description_length / 4);
  

  const handleDescriptionChange = (e) => {

    // prevent page refresh
    e.preventDefault();
      
    let description = e.target.value;
  
    // If description isn't as long as expected, return error.
    // Leave room for error in math.
    if ( description.length < (description_length - 4) || description.length > (description_length*3) ) {
      setDescriptionErr(true);
      handleValid(false);
    }
    else {
      setDescriptionErr(false);
      setDescription(description);
      handleValid(true);
    }
  }

  return (
    // Start actual code.
    <span className='grid grid-rows-7 w-full mx-6'>
      <label className='row-span-3 mb-2 flex items-center justify-start'>
       Description* :
      </label>
      <div className='rows-span-3 mb-2 flex items-center justify-start mx-3'>
        <textarea
          rows={rows}
          cols={cols}
          onBlur={handleDescriptionChange}
          className="w-full h-full"
          />
      </div>

      {/* If Description number not valid format, display error.  */}
      {descriptionErr &&
          <div className='flex items-end justify-center mx-3 text-red-500 text-sm'>
          Description must be at least {description_length - 4} characters. Cannot be more than { description_length * 3} characters.
          </div>  
      }
      
      {/* End code. */}
    </span>
     
  )
}

export default DescriptionField