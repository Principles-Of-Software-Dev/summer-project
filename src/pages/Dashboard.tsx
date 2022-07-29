import React, { useState, useEffect } from 'react'
import TopBar from '../components/lg_components/TopBar' ;
import LogoutConfirmation from '../components/lg_components/LogoutConfirmation' ;
import PopoutMenu from '../components/lg_components/PopoutMenu' ;
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner' ;
import PropertiesControl from '../components/lg_components/PropertiesControl' ;
import { useUser } from '../global/authorization/UserContext' ;

const Dashboard = () => {

	let userInfo ;
	const { getUserInfo } = useUser() ;
	
	useEffect(() => { 
		userInfo = getUserInfo() ;
	},[])

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
			<div className='my-12'>
				<PropertiesControl />
			</div>


			<FakeSiteBanner />
			
			{/* End code. */}
		</div>
	)
}

export default Dashboard