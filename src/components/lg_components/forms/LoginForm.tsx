import React, { useState } from 'react';
import Button from '../../sm_components/Button';
import EmailField from '../../sm_components/validator_fields/EmailField';
import PasswordField from '../../sm_components/validator_fields/PasswordField';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../global/authorization/UserContext';


const LoginForm = ({ handleClickLogin, login }) => {

    // Login Validation.
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const { userLogin } = useUser();
    const navigate = useNavigate();

    const handleNavigate = (page:string, check:boolean) => {

        if (check) {
            navigate(page);
        }
    }
    

    const handleValidLogin = () => {
           
        if (validEmail && validPassword ) {
            return false;
        } else {
            return true;
        }
    } 

    return (
        <div>

            {/* Start actual code. */}
            <Button
                height="h-small-button"
                color='bg-zinc-400'
                buttonText='Login'
                textColor='text-c-white'
                hoverColor='hover:bg-zinc-500'
                disable={false}
                onClick={handleClickLogin}
            />

            {/* dropdown login menu */}
            <form>
                {
                    !login ? <div className='hidden'>
                        
                        {/* Empty */}
                    </div> :
                        
                    // display menu
                    <div className=' absolute right-0 top-[4.5rem] min-h-dropdown-menu-login h-auto w-dropdown-menu min-w-[25rem] bg-zinc-100 grid grid-rows-5'>
                    
                        {/* Email field */}
                        <div className='row-span-2 my-4 flex items-center justify-center'>
                            < EmailField size={25} email={email} setEmail={setEmail} handleValid={setValidEmail} />
                        </div>

                        {/* Password field */}
                        <div className='row-span-2 flex items-center justify-center'>
                            < PasswordField size={25} password={password} setPassword={setPassword} handleValid={setValidPassword}/>
                        </div>

                        {/* "Submit" and "Cancel Button" */}
                                
                        <div className='row-span-1 flex items-center justify-between mb-2 mx-2'>
                        < Button 
                            height="h-xsmall-button"
                            color='bg-zinc-400'
                            buttonText='Submit'
                            textColor='text-c-white'
                            hoverColor='hover:bg-zinc-500'
                            disable={handleValidLogin()}
                            onClick={userLogin}
                        />
                        < Button
                            height="h-xsmall-button"
                            color='bg-zinc-400'
                            buttonText='Cancel'
                            textColor='text-c-white'
                            hoverColor='hover:bg-zinc-500'
                            disable={false}
                            onClick={handleClickLogin}
                        />
                                  
                        <Button
                            height="h-xsmall-button"
                            color='bg-zinc-400'
                            buttonText='Forgot Password'
                            textColor='text-c-white'
                            hoverColor='hover:bg-zinc-500'
                            disable={false}
                            onClick = {()=> handleNavigate("/support" , login)}
                        />  
                        </div>
                    </div>
                }
                
            </form>
            {/* End Code.  */}

        </div>
    )
}

export default LoginForm;