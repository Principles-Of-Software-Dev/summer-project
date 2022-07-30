import React, { useEffect } from 'react' ;
import { useUser } from '../global/authorization/UserContext' ;


const AccountPreferences = () => {

	let userInfo ;
	const { getUserInfo } = useUser() ;
	
	useEffect(() => { 
		//userInfo = getUserInfo() ;
	},[])
    
	return (
		<div>AccountPreferences</div>
	)
}

export default AccountPreferences