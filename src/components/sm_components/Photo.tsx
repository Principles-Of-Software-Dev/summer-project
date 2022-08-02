import React from 'react'

const Photo = (data, description) => {
	return (
		<img src={`data:image/png;base64,${data}`} alt={description} className='w-full h-full p-2' />
	)
}

export default Photo