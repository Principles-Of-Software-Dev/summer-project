import React from 'react'
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner' ;
import LoginBar from '../components/lg_components/LoginBar' ;
import "../styles/GlobalStyle.css" ;
import { Helmet } from 'react-helmet' ;
import LandingPageContent from '../components/lg_components/LandingPageContent' ;
import { useUser } from '../global/authorization/UserContext' ;

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
				<div className='w-screen'>
					<LandingPageContent />
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

export default LandingPage ;