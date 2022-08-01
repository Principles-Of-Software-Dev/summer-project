import React, { useEffect } from 'react'
import TopBar from '../components/lg_components/TopBar'
import { useLocation } from 'react-router-dom'
import ItemForm from '../components/lg_components/forms/ItemForm'
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner'
import PopoutMenu from '../components/lg_components/PopoutMenu'

const ModifyAddItem = () => {

	const location = useLocation() ;
	useEffect(() => { 
		
	}, [])

    
	return (
    	<div className='w-screen h-screen '>
			<TopBar>
				<PopoutMenu />
    			</TopBar>
			<div className='h-[90vh] w-screen'>
    			<ItemForm options={location.state.options} / >
			</div>
			<FakeSiteBanner />
    	</div>
	)
}

export default ModifyAddItem