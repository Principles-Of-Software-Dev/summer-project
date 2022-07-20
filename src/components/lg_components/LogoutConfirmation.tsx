import React from 'react'
import Button from '../sm_components/Button'
import { useUser } from '../../global/authorization/UserContext'

const LogoutConfirmation = ({ setDisplay }) => {
    const { userLogout } = useUser();
    return (
        <div className='h-screen w-screen'>
                <div className='absolute top-[50%] left-[50%] translate-y-1/2 translate-x-1/2 h-quarter w-quarter border bg-zinc-300 border-solid border-black drop-shadow-md'>
                    <div className='w-full h-full flex items-center justify-center'>
                        <p> Logout?</p>
                        <div className='flex items-center justify-evenly'>
                            <Button
                                height="h-xsmall-button"
                                color='bg-zinc-400'
                                buttonText='Logout'
                                textColor='text-c-white'
                                hoverColor='hover:bg-zinc-500'
                                disable={false}
                                onClick={userLogout}
                            />
                            <Button
                                height="h-xsmall-button"
                                color='bg-zinc-400'
                                buttonText='Cancel'
                                textColor='text-c-white'
                                hoverColor='hover:bg-zinc-500'
                                disable={false}
                                onClick={setDisplay}
                            />
                        </div>
    
                    </div>
                </div>
        </div>
  )
}

export default LogoutConfirmation