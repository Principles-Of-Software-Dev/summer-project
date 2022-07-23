import React, { useState } from 'react' ;


const TextField = ({ text_length, text, setText, handleValid, type, largeArea }) => {

	// * copy the line below to parent component and pass "text and setText" as parameters
	// const [text, setText] = useState('');
	const [textErr, setTextErr] = useState(false) ;
	const rows = 4 ;
	const cols = (text_length / 4) ;
  

	const handleTextChange = (e) => {

		// prevent page refresh
		e.preventDefault() ;
      
		let text = e.target.value ;
  
		// If text isn't as long as expected, return error.
		// Leave room for error in math.
		if ( text.length < (text_length - 4) || text.length > (text_length*3) ) {
			setTextErr(true) ;
			handleValid(false) ;
		}
		else {
			setTextErr(false) ;
			setText(text) ;
			handleValid(true) ;
		}
	}

	return (
	// Start actual code.
		<span className='grid grid-rows-7 w-full mx-6'>
			<label className='row-span-3 mb-2 flex items-center justify-start'>
				{ type } * :
			</label>
			<div className='rows-span-3 mb-2 flex items-center justify-start mx-2'>
				{largeArea ?
					<textarea
						rows={rows}
						cols={cols}
						onChange={handleTextChange}
						className="w-full h-full"
					/> : 
					<input
						type="text"
						onChange={handleTextChange}
						required
						size={text_length}
						className='w-full'
					/>}
			</div>

			{/* If Text number not valid format, display error.  */}
			{textErr &&
          <div className='flex items-end justify-center mx-3 text-red-500 text-sm p-4'>
          	{type} must be at least {text_length - 4} characters. Cannot be more than { text_length * 3} characters.
          </div>  
			}
      
			{/* End code. */}
		</span>
     
	)
}

export default TextField