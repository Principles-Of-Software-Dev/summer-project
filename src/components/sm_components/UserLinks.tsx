import React from 'react'

const UserLinks = ({ text, handleClick }) => {
	return (
		<div className='flex items-center justify-center underline underline-offset-1 flex-wrap
		hover:cursor-pointer' onClick={handleClick}>
			{text}
		</div>
	)
}

export default UserLinks