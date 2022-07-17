import React, { useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SupportPage from './pages/SupportPage'


const WebsiteRoutes = () => {

  const [user, setUser] = useState(false);


  return (
    <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
      <Routes>
        {/* principles-of-software-dev.github.io/summer-project/ */}
        <Route path='/' element={< LandingPage user={user} setUser={setUser} />} />
        {/* principles-of-software-dev.github.io/summer-project/support */}
        <Route path='/support' element={< SupportPage />} />
        {/* catches any invalid link and routes to homepage */}
        <Route path='*' element={<Navigate to={"redirectPath"} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default WebsiteRoutes