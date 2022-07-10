import React, { useState } from 'react';
import Button from '../../sm_components/Button';
import EmailField from '../../sm_components/validator_fields/EmailField';
import PasswordField from '../../sm_components/validator_fields/PasswordField';
import { Link } from 'react-router-dom';


const LoginForm = ({handleClickLogin, login }) => {

   

    const handleSubmit = () => {
        // Implement later
  
    }

    return (
        <div>

            {/* Start actual code. */}
            <button onClick={handleClickLogin}>

                <Button
                    height="h-small-button"
                    color='bg-zinc-400'
                    buttonText='Login'
                    textColor='text-c-white'
                    hoverColor='hover:bg-zinc-500'
                />
            </button>

            {/* dropdown login menu */}
            <form onSubmit={handleSubmit}>
                {
                    !login ? <div className='hidden'>
                        
                        {/* Empty */}
                    </div> :
                        
                    // display menu
                    <div className=' absolute right-0 top-[4.5rem] h-dropdown-menu-login w-dropdown-menu min-w-[25rem] bg-zinc-100 grid grid-rows-5'>
                    
                        {/* Email field */}
                        <div className='row-span-2 my-4 flex items-center justify-center'>
                        < EmailField size={25}/>
                        </div>

                        {/* Password field */}
                        <div className='row-span-2 flex items-center justify-center'>
                        < PasswordField size={25}/>
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

                            <button onClick={handleClickLogin}>
                                <Button
                                    height="h-xsmall-button"
                                    color='bg-zinc-400'
                                    buttonText='Cancel'
                                    textColor='text-c-white'
                                    hoverColor='hover:bg-zinc-500'
                                />
                            </button>
                                  
                            <Link to="/support">
                                <Button
                                    height="h-xsmall-button"
                                    color='bg-zinc-400'
                                    buttonText='Forgot Password'
                                    textColor='text-c-white'
                                    hoverColor='hover:bg-zinc-500'
                                />
                            </Link>  
                        </div>
                    </div>
                }
                
            </form>
            {/* End Code.  */}

        </div>
    )
}

export default LoginForm;