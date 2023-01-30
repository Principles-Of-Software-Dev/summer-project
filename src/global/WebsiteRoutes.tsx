import React from 'react' ;
import {Routes, Route, BrowserRouter } from 'react-router-dom' ;
import LandingPage from '../pages/LandingPage' ;
import MissingPage from '../pages/MissingPage' ;
import SupportPage from '../pages/SupportPage' ;
import Dashboard from '../pages/Dashboard' ;
import PrivateRoute from '../components/routes/PrivateRoute' ;
import { UserProvider } from './authorization/UserContext' ;
import AccountPreferences from '../pages/AccountPreferences' ;
import RedirectRoute from '../components/routes/RedirectRoute' ;
import ModifyAddItem from '../pages/ModifyAddItem.jsx' ;

const WebsiteRoutes = () => {
  
	return (
		<BrowserRouter>
			<UserProvider>
				<Routes>
					{/* Public Routes */}
					<Route element={<RedirectRoute />}>
						<Route path="/" element={<LandingPage />} />
					</Route>
					<Route path="/support" element={<SupportPage />} />
					

					{/* Private Routes */}
					<Route element={<PrivateRoute />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/account-preferences" element={<AccountPreferences />} />
						<Route path="/dashboard/edit-item" element={<ModifyAddItem />} />
					</Route>

					{/* Invalid URL */}
					<Route path="*" element={<MissingPage />} />
				</Routes>
			</UserProvider>
		</BrowserRouter>
	)
}

export default WebsiteRoutes