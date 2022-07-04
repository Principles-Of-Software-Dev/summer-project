import React, { useState } from 'react';
import Button from '../Button';
import EmailField from '../validator_fields/EmailField';
import NameField from '../validator_fields/NameField';
import PasswordField from '../validator_fields/PasswordField';
import PhoneField from '../validator_fields/PhoneField';


const RegisterForm = () => {

    const [register, setRegister] = useState(false);
    const handleClickRegister = () => setRegister(!register);

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState(false);
  
    

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
                    <div className='row-span-1 my-4'>
                        < EmailField />
                    </div>

                    {/* Name field */}
                    <div className='row-span-1 flex items-center justify-center'>
                        < NameField />
                    </div>

                    {/* Password field */}
                    <div className='row-span-1 flex items-center justify-center'>
                        < PasswordField />
                    </div>
                          
                    {/* Phone Number field */}
                    <div className='row-span-1 flex items-center justify-center'>
                        < PhoneField />
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