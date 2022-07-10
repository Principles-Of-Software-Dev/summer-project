import React, { useState } from 'react';
import Button from '../../sm_components/Button';
import EmailField from '../../sm_components/validator_fields/EmailField';
import NameField from '../../sm_components/validator_fields/NameField';
import PasswordField from '../../sm_components/validator_fields/PasswordField';
import PhoneField from '../../sm_components/validator_fields/PhoneField';


const RegisterForm = ({handleClickRegister, register}) => {

    const handleSubmit = () => {
        // Implement later
  
    }

  return (
    <div>

        {/* Start actual code. */}
        <button onClick={handleClickRegister}>

            <Button
                height="h-small-button"
                color='bg-zinc-400'
                buttonText='Register'
                textColor='text-c-white'
                hoverColor='hover:bg-zinc-500'
            />
        </button>

        {/* dropdown login menu */}
        <form onSubmit={handleSubmit}>
            {
                !register ? <div className='hidden'>
                    
                    {/* Empty */}
                </div> :
                    
                // display menu
                <div className=' absolute right-0 top-[4.5rem] h-dropdown-menu-register w-dropdown-menu min-w-[25rem] bg-zinc-100 grid grid-rows-4'>
                
                    {/* Email field */}
                    <div className='row-span-1 my-4 flex items-center justify-center'>
                        < EmailField size={25}/>
                    </div>

                    {/* Name field */}
                    <div className='row-span-1 flex items-center justify-center'>
                        < NameField size={25}/>
                    </div>

                    {/* Password field */}
                    <div className='row-span-1 flex items-center justify-center'>
                        < PasswordField size={25} />
                    </div>
                          
                    {/* Phone Number field */}
                    <div className='row-span-1 flex items-center justify-center'>
                        < PhoneField size={25} />
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
              
        
        </form>
    {/* End Code.  */}

    </div>
  )
}

export default RegisterForm