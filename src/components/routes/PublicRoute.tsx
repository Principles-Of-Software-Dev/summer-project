import React from 'react';
import { Navigate } from 'react-router-dom';

// Sends users to homepage if already logged in.
const PublicRoute = ({user, redirectPath = '/home', children}) => {
    if (user) {
        return <Navigate to={redirectPath} replace />;
    }
          
    return children;
}

export default PublicRoute