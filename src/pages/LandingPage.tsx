import React from 'react'
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner';
import LoginBar from '../components/lg_components/LoginBar';
import "../styles/GlobalStyle.css"

const LandingPage = () => {
  return (
    <div className='relative w-screen h-screen'>
      <header>
        <head>
          <meta charSet='utf-8' />
          <title> Gilderise Enterprise Homepage</title>
        </head>
      </header>
      <FakeSiteBanner />
      <LoginBar />
    </div>
  )
}

export default LandingPage;