import React, { useState } from 'react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline' ;
import Button from './Button' ;

const Item = ({ item, displayItem, displayItemForm }) => {
    
	const [currIndex, setCurrIndex] = useState(0) ;
	const maxLength = item.photos.length ;

	const prevPic = () => {
		setCurrIndex(currIndex === 0 ? (maxLength - 1) : (currIndex - 1)) ;
	} ;
	const nextPic = () => {
		setCurrIndex(currIndex === (maxLength - 1) ? 0 : (currIndex + 1)) ;
	} ;

	console.log(item.photos)

	return (
		<div className='md:max-w-[30vw] w-full max-h-full my-8 flex items-center justify-center'>
			<div className='h-full w-full p-6 border border-solid rounded-md grid grid-row-2 '>
				{/* Image */}
				<div className='row-span-1 '>
					{item.photos.map((img, index) => {
						return (
							<div
								className={index === currIndex ? 'opacity-80 scale-110 ease-linear duration-100' : 'opacity-0'}
								key={index}
							>
								{index === currIndex && (
									<div className='w-full h-full flex items-center justify-center' >
										<div className='w-full h-full'>
											<ChevronLeftIcon className='h-xsmall-logo absolute top-[50%] left-2 cursor-pointer select-none' onClick={prevPic} />
											<ChevronRightIcon className='h-xsmall-logo absolute top-[50%] right-2 cursor-pointer select-none' onClick={nextPic} />
											<div className='absolute w-auto p-1 z-1 bg-sky-300 border rounded-md top-3 md:top-4 left-3 md:left-4'>
												<p className='text-sm tracking-wide '> ${ item.estimate }</p>
											</div>
											<img src={`data:image/png;base64,${img}`} alt={"item.description"} className='w-full h-main p-2' />
										</div>
									</div>
								)}
							</div>
						)
					})}
				</div> 
				{/* Everything Else */}
				<div className='myt-2 py-2 grid'>
					<div className='row-span-1'>
						<div className='w-full flex items-center justify-center overflow-scroll'>
							{ item.description}
						</div>

						<div className='row-span-1 mt-2 flex items-center justify-end w-full'>
							<div className='grid grid-rows-2 pt-3'>
								<div className='flex items-center justify-end row-span-1 my-1'>
									<Button
										height="h-small-button"
										color='bg-sky-400'
										buttonText='View Item'
										textColor='text-c-white'
										hoverColor='hover:bg-sky-500'
										disable={false}
										onClick={() => displayItem( item )}
									/>
								</div>
								<div className='flex items-center justify-end row-span-1 my-1'>
									<Button
										height="h-small-button"
										color='bg-sky-400'
										buttonText='Edit Item'
										textColor='text-c-white'
										hoverColor='hover:bg-sky-500'
										disable={false}
										onClick={() => displayItemForm( item, "Edit" )}
									/>
								</div>
								
							</div>
						</div>
					</div>

				</div>

			</div>
		</div>
	)
}

export default Item