import React, { useState } from 'react'
import TopBar from '../components/lg_components/TopBar' ;
import LogoutConfirmation from '../components/lg_components/LogoutConfirmation' ;
import PopoutMenu from '../components/lg_components/PopoutMenu' ;
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner' ;

const Dashboard = () => {

	const [displayLogout, setDisplayLogout] = useState(false) ;

	const handleDisplayLogout = () => setDisplayLogout(!displayLogout) ; 
	

  
	return (
		<div>
			{/* Start actual code. */}
			<div>
				{/* Logout Confirmation Box. */}
				{displayLogout && <LogoutConfirmation setDisplay={handleDisplayLogout} /> }
			</div>
			<TopBar>
				<PopoutMenu handleDisplayLogout={handleDisplayLogout}/>
			</TopBar>
			<FakeSiteBanner />
			{/* End code. */}
		</div>
	)
}

export default Dashboard