import React from 'react'
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner';
import TopBar from '../components/lg_components/TopBar';
import { Helmet } from 'react-helmet';

const SupportPage = () => {
    return (
        <div>
            <header>
                <Helmet>
                    <title> Request Help</title>
                </Helmet>
            </header>
            <FakeSiteBanner />
            <TopBar />
    </ div>
  )
}

export default SupportPage