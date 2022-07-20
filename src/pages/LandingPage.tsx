import React from 'react'
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner';
import LoginBar from '../components/lg_components/LoginBar';
import "../styles/GlobalStyle.css";
import { Helmet } from 'react-helmet';

const LandingPage = () => {
  return (
    <div className='relative w-screen h-screen'>

      {/* Page info */}
      <header>
        <Helmet>
          <meta charSet='utf-8' />
          <title> Gilderise Enterprise | Homepage</title>
        </Helmet>
      </header>

      {/* Page Content */}
      <main>

        {/* Navbar section */}
        <nav>
          <LoginBar />
        </nav>

        {/* Main content */}
      </main>
      
      {/* Page footer*/}
      <footer>

        {/* Link to github repo */}
        <FakeSiteBanner />
      </footer>
    </div>
  )
}

export default LandingPage;