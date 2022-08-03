import React, { useState, useEffect } from 'react'
import TopBar from '../components/lg_components/TopBar' ;
import LogoutConfirmation from '../components/lg_components/LogoutConfirmation' ;
import PopoutMenu from '../components/lg_components/PopoutMenu' ;
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner' ;
import ItemsControl from '../components/lg_components/ItemsControl' ;
import { useUser } from '../global/authorization/UserContext' ;
import { useNavigate } from 'react-router-dom' ;
import Button from '../components/sm_components/Button' ;


const Dashboard = () => {

	const { user, deleteItem, getItems } = useUser() ;
	let userId = user.id ;
	useEffect(() => { 
		getItems(userId) ;
		
	}, [])
	const navigate = useNavigate() ;

	const [displayLogout, setDisplayLogout] = useState(false) ;

	const handleDisplayLogout = () => { setDisplayLogout(!displayLogout) } ; 
	
	const handleAddItem = () => {
		let options =  {
			'operation': 'Add',
			'item': null
		}

		navigate('edit-item', { state: { options } })
	}

	const handleDeleteItem = (item_id) => {
		const formData = new FormData() ;

		formData.append('item_id', item_id)
		formData.append('user_id', userId)

		deleteItem(formData) ;
	}

  
	return (
		<div>
			{/* Start actual code. */}
			<div>
				{/* Logout Confirmation Box. */}
				{displayLogout && <LogoutConfirmation setDisplay={handleDisplayLogout} /> }
			</div>
			{/* Top Banner and Side Menu */}
			<TopBar>
				<div className='max-h-full max-w-full flex items-center justify-end'>
					<div className='md:flex hidden'>
						<Button
							height="h-xsmall-button"
							color='bg-sky-400'
							buttonText='Add Item'
							textColor='text-c-white'
							hoverColor='hover:bg-sky-500'
							disable={false}
							onClick={handleAddItem}
						/>
					</div>
					<PopoutMenu handleDisplayLogout={handleDisplayLogout} handleAddItem={handleAddItem} />
				
				</div>
				
			</TopBar>
			<div className='my-12'>
				<ItemsControl handleAddItem={handleAddItem} handleDeleteItem={ handleDeleteItem} />
			</div>


			<FakeSiteBanner />
			
			{/* End code. */}
		</div>
	)
}

export default Dashboard