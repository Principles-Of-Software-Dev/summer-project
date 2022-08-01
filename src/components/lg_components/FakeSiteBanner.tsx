import React from 'react'
import { ArrowRightIcon } from '@heroicons/react/outline'


const FakeSiteBanner = () => {
	return (
		<div> 

			{/* Start actual code */}
			<footer>

				{/* Link to Github repo. Stays at bottom of screen. */}
				<a href="https://github.com/Principles-Of-Software-Dev/summer-project/tree/master" >
					<section className='h-10 w-full bg-sky-200 hover:bg-sky-300 flex items-center justify-center fixed bottom-0 group'>
						<p className='flex items-center text-xs tracking-widest'>
                  Click Here to Check our Repo Out!
						</p>

						{/* Add horizontal bounce effect on hover */}
						<ArrowRightIcon className='group-hover:translate-x-1 transition h-5 m-2 ' />
					</section>
				</a>

			</footer>
			{/* End code */}

		</div>
	)
}

export default FakeSiteBanner ;
