import React from 'react';
import { Route } from 'react-router-dom';

// Sends users to 'RedirectPage' if not authenticated.
// ex. Non-authenticated users cannot access database without logging in. Direct them to landing page.
const PrivateRoute = ({TargetPage, RedirectPage, authenticated, path}) => {
    return (
        <div>
            {authenticated ? 
                (<Route path={path} element={TargetPage} />):
                (<Route path={path} element={RedirectPage} />)
            }
        </div>
  )
}

export default PrivateRoute