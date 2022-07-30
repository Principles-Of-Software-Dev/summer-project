import React from 'react'
import { MailIcon, LocationMarkerIcon, AtSymbolIcon, ArrowRightIcon, PhoneIcon } from '@heroicons/react/outline'

const ContactUs = () => {
	return (
		<div className='flex items-center justify-center w-full h-full text-white'>
			{/* Start actual code. */}
			<div className='grid grid-rows-7 w-auto h-main p-4'>
				<p className='flex items-center justify-center row-span-1 col-span-2 text-xl text-red-300'>
					<h3><strong>Contact Us</strong></h3>
				</p>
				<div className='flex items-center justify-center row-span-1 col-span-2 text-gray-200'>
					<LocationMarkerIcon className='h-xsmall-logo'/>
					<p className='px-2'> 777 Glades Road, Boca Raton, FL 33431 </p>
				</div>

				<div className='flex items-center justify-center row-span-1 col-span-2 text-red-200'>
					<PhoneIcon className='h-xsmall-logo'/>	
					<p className='px-2'> 123.456.7890 </p>
				</div>

				<div className='flex items-center justify-center row-span-1 col-span-2 text-gray-200'>
					<MailIcon className='h-xsmall-logo'/>	
					<p className='px-2'> gilderise1enterprises@gmail.com </p>
				</div>

				<div className='flex items-center justify-center row-span-1 col-span-2 text-red-200'>
					<AtSymbolIcon className='h-xsmall-logo'/>	
					<p className='px-2'> gilderise_enterprises </p>
				</div>

				<div className='flex items-center justify-center row-span-2 col-span-2 group'>
					<p className='px-2'>
                  	Click Here to Check our Repo Out!
					</p>
					{/* Add horizontal bounce effect on hover */}
					<ArrowRightIcon className='group-hover:translate-x-1 transition h-5 m-2 ' />
				</div>
				

			</div>
		</div>
	)
}

export default ContactUs