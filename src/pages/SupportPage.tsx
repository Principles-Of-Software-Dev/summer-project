import React from 'react'
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner';
import TopBar from '../components/lg_components/TopBar';
import { Helmet } from 'react-helmet';

const SupportPage = () => {
    return (
        <div className='relative w-screen h-screen'>

        {/* Page info */}
        <header>
          <Helmet>
            <meta charSet='utf-8' />
            <title> Gilderise Enterprise | Request Help</title>
          </Helmet>
        </header>
  
        {/* Page Content */}
        <main>
  
          {/* Navbar section */}
          <nav>
            <TopBar />
          </nav>
  
          {/* Main content */}
          <body>
  
          </body>
        </main>
        
        {/* Page footer*/}
        <footer>
  
          {/* Link to github repo */}
          <FakeSiteBanner />
        </footer>
      </div>
  )
}

export default SupportPage