import React from 'react';
import { Navigate } from 'react-router-dom';


// Sends users to Landing/Login or Register page if not logged in.
const PrivateRoute = ({user, redirectPath = '/', children}) => {
    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }
          
    return children;
}

export default PrivateRoute