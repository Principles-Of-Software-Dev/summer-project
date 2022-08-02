import React, { useEffect } from 'react' ;
import { useLocation } from 'react-router-dom' ;
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner' ;
import TopBar from '../components/lg_components/TopBar' ;
import EditAccountForm from '../components/lg_components/forms/EditAccountForm' ;


const AccountPreferences = () => {

	const location = useLocation() ;
	const option = location.state.options.operation
	console.log(option)
	const userInfo = location.state.options.userInfo
	
    
	return (
		<div className='w-screen h-screen'>
			<TopBar>
			</TopBar>

			<EditAccountForm option={option} userInfo={userInfo} />
			
			<FakeSiteBanner />
		</div>
	)
}

export default AccountPreferences