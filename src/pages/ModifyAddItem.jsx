import React, { useState } from 'react'
import TopBar from '../components/lg_components/TopBar'
import { useLocation, useNavigate } from 'react-router-dom'
import ItemForm from '../components/lg_components/forms/ItemForm'
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner'
import PopoutMenu from '../components/lg_components/PopoutMenu'
import { useUser } from '../global/authorization/UserContext'
import LogoutConfirmation from '../components/lg_components/LogoutConfirmation'

const ModifyAddItem = () => {

	const { user } = useUser() ;
	const location = useLocation() ;
	const userId = user.id
	const [displayLogout, setDisplayLogout] = useState(false) ;
	const navigate = useNavigate() ;

	const handleDisplayLogout = () => { setDisplayLogout(!displayLogout) } ; 

	const handleAddItem = () => {
		let options =  {
			'operation': 'Add',
			'item': null
		}

		navigate('edit-item', { state: { options } })
	}
    
	return (
		<div className='w-screen h-screen '>
			<div>
				{/* Logout Confirmation Box. */}
				{displayLogout && <LogoutConfirmation setDisplay={handleDisplayLogout} /> }
			</div>
			<TopBar>
				<PopoutMenu handleDisplayLogout={handleDisplayLogout} userId={userId} handleAddItem={handleAddItem} />
    			</TopBar>
			<div className='h-[90vh] w-screen'>
    			<ItemForm options={location.state.options} / >
			</div>
			<FakeSiteBanner />
    	</div>
	)
}

export default ModifyAddItem