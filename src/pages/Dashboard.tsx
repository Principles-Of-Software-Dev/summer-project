import React, { useState } from 'react'
import TopBar from '../components/lg_components/TopBar' ;
import LogoutConfirmation from '../components/lg_components/LogoutConfirmation' ;
import PopoutMenu from '../components/lg_components/PopoutMenu' ;
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner' ;
import PropertiesControl from '../components/lg_components/PropertiesControl' ;

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
			{/* Top Banner and Side Menu */}
			<TopBar>
				<PopoutMenu handleDisplayLogout={handleDisplayLogout} userId />
			</TopBar>

			<PropertiesControl />




			<FakeSiteBanner />
			
			{/* End code. */}
		</div>
	)
}

export default Dashboard