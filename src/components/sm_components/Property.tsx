import React, { useState } from 'react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline' ;

const Property = ({ property }) => {
    
	const [currIndex, setCurrIndex] = useState(0) ;
	const maxLength = property.photos.length ;

	const prevPic = () => {
		setCurrIndex(currIndex === 0 ? (maxLength - 1) : (currIndex - 1)) ;
		console.log(currIndex) ;
	} ;
	const nextPic = () => {
		setCurrIndex(currIndex === (maxLength - 1) ? 0 : (currIndex + 1)) ;
		console.log(currIndex) ;
	} ;



	return (
		<div className='md:max-w-[25vw] max-w-[40vw] h-most m-4'>
			<div className='h-full w-full p-6 border border-solid rounded-md grid grid-row-2'>
				{/* Image */}
				<div className='row-span-1 relative'>
					{property.photos.map((img, index) => {
						return (
							<div
								className={index === currIndex ? 'opacity-80 scale-110 ease-linear duration-100' : 'opacity-0'}
								key={index}
							>
								{index === currIndex && (
									<img src={img} alt={"Beautiful Property"} className='min-w-[95%] min-h-[95%]'/>
								)}
							</div>
						)
					})}
					<ChevronLeftIcon className='h-xsmall-logo absolute top-[50%] left-2 cursor-pointer select-none' onClick={prevPic} />
					<ChevronRightIcon className='h-xsmall-logo absolute top-[50%] right-2 cursor-pointer select-none' onClick={nextPic} /> 
				</div>
				{/* Everything Else */}
				<div className='my-2 p-2 grid grid-rows-3 grid-cols-2'>
					<div className='row-span-1 col-span-2'>
						{property.street}
					</div>

				</div>

			</div>
		</div>
	)
}

export default Property