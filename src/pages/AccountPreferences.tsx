import React from 'react' ;
import { useUser } from '../global/authorization/UserContext' ;


const AccountPreferences = () => {
	const { } = useUser() ;
    
	return (
		<div>AccountPreferences</div>
	)
}

export default AccountPreferences