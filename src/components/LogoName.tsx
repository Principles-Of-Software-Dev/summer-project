import React from 'react'
import DummyLogo from '../assets/dummy_logo.png'

const LogoName = () => {
    return (

    //   Start actual code.
        <section className='flex items-center justify-start '>
            <img className="h-small-logo w-small-logo mx-4" src={ DummyLogo } alt="Gilderise Enterprise Logo" ></img>
            <p className='text-xl font-cursive tracking-wider'> Gilderise Enterprise</p>
        </section>
        // End code.
        
  )
}

export default LogoName