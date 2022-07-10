import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Button from '../sm_components/Button';
import EmailField from '../sm_components/validator_fields/EmailField';
import NameField from '../sm_components/validator_fields/NameField';
import PasswordField from '../sm_components/validator_fields/PasswordField';
import PhoneField from '../sm_components/validator_fields/PhoneField';
import { Link } from 'react-router-dom';

// @TODO cleanup and restructure code. Create components for long sections.

const MobileMenu = () => {

    // Logic functions to control when menu and what hamburger menu displays.
    const [menu, setMenu] = useState(false);
    const handleClickMenu = () => setMenu(!menu);

    const [login, setLogin] = useState(false);
    const handleClickLogin = () => setLogin(!login);

    const [register, setRegister] = useState(false);
    const handleClickRegister = () => setRegister(!register);


    const handleSubmit = () => {
        // Implement later
  
    }

    return (
        <div>

            {/* Start actual code. */}
            <div className='md:hidden'>
                <div onClick={handleClickMenu}>

                    {/* Display dropdown nav when hamburger menu clicked */}
                    {!menu ? <MenuIcon className='h-xsmall-logo w-xsmall-logo mx-6' /> :
                        <div>
                            <XIcon className='h-xsmall-logo w-xsmall-logo mx-4' />
                        </div>
                    }
                </div>
                    
                {menu &&
                    <div className='absolute top-[4.5rem] left-0 w-dropdown-menu-mobile bg-zinc-100 '>

                        {/* Display "Login" and "Register" buttons or forms */}
                        {(!login && !register) &&
                            <div className='h-dropdown-menu-mobile flex items-center justify-center '>
                                <button onClick={handleClickLogin}>
                                    <Button
                                        height="h-small-button"
                                        color='bg-zinc-400'
                                        buttonText='Login'
                                        textColor='text-c-white'
                                        hoverColor='hover:bg-zinc-500'
                                    />
                                </button>

                                <button onClick={handleClickRegister}>
                                    <Button
                                        height="h-small-button"
                                        color='bg-zinc-400'
                                        buttonText='Register'
                                        textColor='text-c-white'
                                        hoverColor='hover:bg-zinc-500'
                                    />
                                </button>
                            </div>
                            
                        }
                        
                        {(login && !register) &&
                            <div className='h-dropdown-menu-mobile-login ' >
                                <div className="grid grid-rows-5">
                                    {/* Email field */}
                                    <div className='row-span-2 my-4'>
                                        < EmailField size={15} />
                                    </div>

                                    {/* Password field */}
                                    <div className='row-span-2 flex items-center justify-center'>
                                        < PasswordField size={15}/>
                                    </div>

                                    {/* "Submit" and "Cancel Button" */} 
                                    <div className='row-span-1 flex items-center justify-center mb-2 mx-2'>
                                        < button onClick={handleSubmit}>
                                            <Button
                                                height="h-xsmall-button"
                                                color='bg-zinc-400'
                                                buttonText='Submit'
                                                textColor='text-c-white'
                                                hoverColor='hover:bg-zinc-500'
                                            />
                                        </ button>

                                        <button onClick={handleClickLogin}>
                                            <Button
                                                height="h-xsmall-button"
                                                color='bg-zinc-400'
                                                buttonText='Cancel'
                                                textColor='text-c-white'
                                                hoverColor='hover:bg-zinc-500'
                                            />
                                        </button>
                                            
                                        <button>
                                            <Link to="/support">
                                            <Button
                                                height="h-xsmall-button"
                                                color='bg-zinc-400'
                                                buttonText='Forgot Password'
                                                textColor='text-c-white'
                                                hoverColor='hover:bg-zinc-500'
                                            />
                                            </Link>
                                        </button>  
                                    </div>

                                </div>
                            </div>
                        }

                        {(!login && register) &&
                            <div>
                                {/* Email field */}
                                <div className='row-span-1 my-4'>
                                    < EmailField size={15}/>
                                </div>

                                {/* Name field */}
                                <div className='row-span-1 flex items-center justify-center'>
                                    < NameField size={15}/>
                                </div>

                                {/* Password field */}
                                <div className='row-span-1 flex items-center justify-center'>
                                    < PasswordField size={15}/>
                                </div>
                                    
                                {/* Phone Number field */}
                                <div className='row-span-1 flex items-center justify-center'>
                                    < PhoneField size={15} />
                                </div>

                                {/* "Submit" and "Cancel Button" */} 
                                <div className='row-span-1 flex items-center justify-between mb-2 mx-2'>
                                    < button onClick={handleSubmit}>
                                        <Button
                                            height="h-xsmall-button"
                                            color='bg-zinc-400'
                                            buttonText='Submit'
                                            textColor='text-c-white'
                                            hoverColor='hover:bg-zinc-500'
                                        />
                                    </ button>

                                    <button onClick={handleClickRegister}>
                                        <Button
                                            height="h-xsmall-button"
                                            color='bg-zinc-400'
                                            buttonText='Cancel'
                                            textColor='text-c-white'
                                            hoverColor='hover:bg-zinc-500'
                                        />
                                    </button>
                                        
                                </div>

                            </div>  
                        }
                        
                    </div>
                }
            
            </div>
            {/* End code. */}

        </div>
        
  )
}

export default MobileMenu