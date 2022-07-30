import React, { useState, useEffect } from 'react'
import TopBar from '../components/lg_components/TopBar' ;
import LogoutConfirmation from '../components/lg_components/LogoutConfirmation' ;
import PopoutMenu from '../components/lg_components/PopoutMenu' ;
import FakeSiteBanner from '../components/lg_components/FakeSiteBanner' ;
import PropertiesControl from '../components/lg_components/PropertiesControl' ;
import { useUser } from '../global/authorization/UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/sm_components/Button';

const Dashboard = () => {

	let userInfo ;
	const { getUserInfo ,user } = useUser() ;
	
	useEffect(() => { 
		// userInfo = getUserInfo();
		
	}, [])
	const navigate = useNavigate();

	const [displayLogout, setDisplayLogout] = useState(false) ;

	const handleDisplayLogout = () => setDisplayLogout(!displayLogout); 
	
	const handleAddProperty = () => {
		let options =  {
			'operation': 'Add',
			'property': null
		}

		navigate('edit-property', { state: { options } })
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
				<Button
							height="h-xsmall-button"
							color='bg-zinc-400'
							buttonText='Add Property'
							textColor='text-c-white'
							hoverColor='hover:bg-zinc-500'
							disable={false}
							onClick={() => handleAddProperty()}
						/>
					<PopoutMenu handleDisplayLogout={handleDisplayLogout} userId />
				
				</div>
				
			</TopBar>
			<div className='my-12'>
				<PropertiesControl />
			</div>


			<FakeSiteBanner />
			
			{/* End code. */}
		</div>
	)
}

export default Dashboard