import React from 'react';
import { Route } from 'react-router-dom';

// Sends users to 'Redirect' if authenticated.
// ex. authenticated users get pushed to Dashboard Page instead of Landing Page if they've already logged in.
const PublicRoute = ({TargetPage, RedirectPage, authenticated, path}) => {
  return (
    <div>
            {authenticated ? 
                (<Route path={path} element={RedirectPage} />):
                (<Route path={path} element={TargetPage} />)
            }
        </div>
  )
}

export default PublicRoute