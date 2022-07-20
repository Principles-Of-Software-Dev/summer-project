import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import MissingPage from '../pages/MissingPage';
import SupportPage from '../pages/SupportPage';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../components/routes/PrivateRoute';
import { UserProvider } from './authorization/UserContext';

const WebsiteRoutes = () => {
  
  return (
    <BrowserRouter basename={`/${process.env.PUBLIC_URL}`} >
      <UserProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="support" element={<SupportPage />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
         </Route>

          {/* Invalid URL */}
          <Route path="*" element={<MissingPage />} />
        </Routes>
        </UserProvider>
      </BrowserRouter>
  )
}

export default WebsiteRoutes