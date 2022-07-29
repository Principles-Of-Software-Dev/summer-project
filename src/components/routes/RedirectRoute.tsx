import React from 'react' ;
import { Navigate, Outlet } from 'react-router-dom' ;
import { useUser } from '../../global/authorization/UserContext' ;


// Sends users to Landing/Login or Register page if not logged in.
const RedirectRoute = () => {
	const { user } = useUser() ;

	return (
		user.authenticated ?
			<Navigate to="/dashboard"/>:
			<Outlet /> 
	) ;
    
}

export default RedirectRoute ;