import React from 'react'
import FakeSiteBanner from '../components/FakeSiteBanner';
import LoginBar from '../components/LoginBar';
import "../styles/GlobalStyle.css"

const LandingPage = () => {
  return (
    <div className='relative w-screen h-screen'>
      <FakeSiteBanner />
      <LoginBar />
    </div>
  )
}

export default LandingPage;