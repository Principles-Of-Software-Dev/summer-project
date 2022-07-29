import React from 'react'
import TopBar from '../components/lg_components/TopBar'
import { useLocation } from 'react-router-dom'
import PropertyForm from '../components/lg_components/forms/PropertyForm'
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner'
import PopoutMenu from '../components/lg_components/PopoutMenu'

const ModifyAddProperty = () => {

	const location = useLocation() ;

    
	return (
    	<div className='w-screen h-screen '>
			<TopBar>
				<PopoutMenu />
    			</TopBar>
			<div className='h-[90vh] w-screen'>
    			<PropertyForm options={location.state.options} / >
			</div>
			<FakeSiteBanner />
    	</div>
	)
}

export default ModifyAddProperty