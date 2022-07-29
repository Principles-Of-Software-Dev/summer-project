import React, { useState } from 'react' ;


const TextField = ({ text_length, setText, handleValid, type, largeArea, required, ...rest }) => {
	

	// * copy the line below to parent component and pass "text and setText" as parameters
	// const [text, setText] = useState('');
	const [textErr, setTextErr] = useState(false) ;
	const rows = 4 ;
	const cols = (text_length / 4) ;
	let initial = null ;

	if (rest != null) {
		handleValid(true) ;
		initial = rest.storedVal ;
	}

	const handleTextChange = (e) => {

		// prevent page refresh
		e.preventDefault() ;
      
		let text = e.target.value ;
  
		// If text isn't as long as expected, return error.
		// Leave room for error in math.
		if (required || (text !=='')) {
			if (text.length < (text_length / 2) || text.length > (text_length * 3)) {

				if (rest.storedVal != null) {
					rest.storedVal = text ;
				}
				handleValid(false) ;
				if (initial != null) {
					if (initial !== e.target.value) {
						rest.changed(true) ;
					} else {
						rest.changed(false) ;
					}
				}
				return true ;
			}
			else {
				if (textErr) { setTextErr(false) }
				setText(text) ;
				handleValid(true) ;
				if (initial != null) {
					if (initial !== e.target.value) {
						rest.changed(true) ;
					} else {
						rest.changed(false) ;
					}
				}
				return false ;
			}
		} else { 
			if (textErr) { setTextErr(false) }
			setText(text) ;
			handleValid(true) ;
			if (initial != null) {
				if (initial !== e.target.value) {
					rest.changed(true) ;
				} else {
					rest.changed(false) ;
				}
			}
			return false ;
		}
	}

	const handleSetErrMsg = (e) => {
		setTextErr(handleTextChange(e)) ;
		if (initial != null) {
			if (initial !== e.target.value) {
				rest.changed(true) ;
			} else {
				rest.changed(false) ;
			}
		}
	}

	return (
	// Start actual code.
		<span className='grid grid-rows-7 w-full mx-6 max-h-full'>
			<label className='row-span-3 mb-2 flex items-center justify-start'>
				{ type } * :
			</label>
			<div className='rows-span-3 mb-2 flex items-center justify-start mx-2'>
				{largeArea ?
					<textarea
						rows={rows}
						cols={cols}
						onChange={handleTextChange}
						onBlur={handleSetErrMsg}
						className="w-full h-full"
						defaultValue={rest.storedVal != null ? rest.storedVal : null}
					/> : 
					< input
						type="text"
						onChange={handleTextChange}
						onBlur={handleSetErrMsg}
						required
						size={text_length}
						className='w-full'
						defaultValue={rest.storedVal != null ? rest.storedVal : null}
					/>}
			</div>

			{/* If Text number not valid format, display error.  */}
			{textErr &&
          <div className='flex items-end justify-center mx-3 text-red-500 text-sm p-4'>
          	{type} must be at least {text_length /2} characters. Cannot be more than { text_length * 3} characters.
          </div>  
			}
      
			{/* End code. */}
		</span>
     
	)
}

export default TextField