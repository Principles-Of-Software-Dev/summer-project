import React, { useEffect } from 'react'

const FileUpload = ({ size, required, setName, handleValid, type }) => {

    let up;
    useEffect(() => { 
		up = document.getElementById(type) ;
	},[])
    
	const handleFileUpload = (e) => {
      
		// Prevents page refresh.
		e.preventDefault() ;
		// No validation other than empty field

		// If field is filled, set name; else, return error.
		if (required || up) {
			if (up.files.length === 0) {
				handleValid(false) ;
			}
			else {
				handleValid(true) ;
			}
		} else {
			handleValid(true) ;
		}
    }
    
  return (
    // Start actual code.
		<span className='grid grid-rows-7 mx-6 max-h-full'>
        <label className='row-span-3 mb-2 flex items-center justify-start'>
            {type} * :
        </label>
          <div className='rows-span-3 mb-2 flex items-center justify-start mx-2' id={type}>
            <input
				  type="file"
				  multiple={true}
                onChange={handleFileUpload}
            />
        </div>
  
        {/* End code. */}
    </span>
  )
}

export default FileUpload