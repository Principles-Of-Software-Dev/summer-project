import React from 'react'
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner';
import TopBar from '../components/lg_components/TopBar';
import { Helmet } from 'react-helmet';
import SupportForm from '../components/lg_components/forms/SupportForm';
import ContactUs from '../components/sm_components/ContactUs';

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
        <main className='h-main w-full'>
  
          {/* Navbar section */}
            <TopBar />
  
        {/* Main content */}
          <div className='sm:grid grid-cols-2 h-[40rem] w-full bg-house-banner-2 bg-cover bg-no-repeat bg-center'>
            {/* Create Space; To do, implement Contact Us Component */}
            <ContactUs />

            <SupportForm  />
          </div>
          
        
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