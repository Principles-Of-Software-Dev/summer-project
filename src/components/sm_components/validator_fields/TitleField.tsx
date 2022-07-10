import React, { useState } from 'react';



const TitleField = ({title_length}) => {

  const [title, setTitle] = useState('');
    const [titleErr, setTitleErr] = useState(false);
    const rows = 2;
    const cols = ( title_length / 2) ;

  const handleTitleChange = (e) => {

    // prevent page refresh
    e.preventDefault();
      
      let title = e.target.value;
  
    // If title isn't as long as expected, return error.
    // Leave room for error in math.
    if ( title.length < (title_length - 2) || title.length > (title_length * 4)) {
      setTitleErr(true);
    }
    else {
        setTitleErr(false);
        setTitle(title);
    }
  }

  return (
    // Start actual code.
    <span className='grid grid-rows-7 w-full mx-6'>
      <label className='row-span-3 mb-2 flex items-center justify-start'>
       Title* :
      </label>
      <div className='rows-span-3 mb-2 flex items-center justify-start mx-3'>
        <textarea
            onBlur={handleTitleChange} 
            rows={rows}
            cols={cols}  
            className="w-full h-full"      
          />
      </div>

      {/* If Title number not valid format, display error.  */}
      {titleErr &&
          <div className='relative bottom-0 flex items-end justify-center mx-3 text-red-500 text-sm'>
          Title must be at least {title_length - 2} characters. Cannot be more than { title_length * 4} characters.
          </div>  
      }
      
      {/* End code. */}
    </span>
     
  )
}

export default TitleField