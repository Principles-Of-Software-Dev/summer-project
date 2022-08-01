import React from 'react'
import PotentialLogo from '../../assets/potential_logo.png'

const LogoName = () => {
	return (
	//   Start actual code.
		<section className='flex items-center justify-start '>
			<img className="h-small-logo w-small-logo mx-4" src={ PotentialLogo } alt="Gilderise Enterprise Logo" ></img>
			<p className='text-xl font-cursive tracking-wider'> Gilderise Enterprise</p>
		</section>
	// End code.
        
	)
}

export default LogoName