import React from 'react' ;
import { Navigate, useLocation, Outlet } from 'react-router-dom' ;
import { useUser } from '../../global/authorization/UserContext' ;


// Sends users to Landing/Login or Register page if not logged in.
const PrivateRoute = () => {
	const { user } = useUser() ;
	const location = useLocation() ;

	return (
		user.authenticated ?
			<Outlet /> :
			<Navigate to="/" state={{ from: location }} replace />
	) ;
    
}

export default PrivateRoute ;