import React, {useState} from 'react'
import Button from '../components/sm_components/Button'
import LogoutConfirmation from '../components/lg_components/LogoutConfirmation';

const Dashboard = () => {
  const [displayLogout, setDisplayLogout] = useState(false);

  const handleDisplayLogout = () => setDisplayLogout(!displayLogout); 
  
  return (
    <div>
      {displayLogout && <LogoutConfirmation setDisplay={handleDisplayLogout} /> }
        < Button
            height="h-small-button"
            color='bg-zinc-400'
            buttonText='Logout'
            textColor='text-c-white'
            hoverColor='hover:bg-zinc-500'
            disable={false}
            onClick={handleDisplayLogout}
          />
      </div>
  )
}

export default Dashboard