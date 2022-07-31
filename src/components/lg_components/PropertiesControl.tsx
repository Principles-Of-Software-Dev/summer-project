import React, { useState, useEffect } from 'react'
import PropertiesList from './PropertiesList'
import DisplayProperty from './DisplayProperty' ;
import { useNavigate } from 'react-router-dom' ;
import { useUser } from '../../global/authorization/UserContext' ;
import UserLinks from '../sm_components/UserLinks' ;

const PropertiesControl = ({ handleAddProperty }) => {
	const { fetchProperties, properties, deleteProperty } = useUser() ;
	const navigate = useNavigate() ;
	

	const [displayProperty, setDisplayProperty] = useState(null) ;
	
	useEffect(() => {
		fetchProperties() ;
		// deleteProperty(1)
		// deleteProperty(2)
		// deleteProperty(3)
	}, [])

	useEffect(() => {
		if (displayProperty != null) {
			document.body.style.overflow = "hidden" ;
		} else {
			document.body.style.overflow = "visible" ;
		}
	}, [displayProperty]) ;
	

	
	const handleViewProperty = property => { 
		setDisplayProperty(property) ; 
	}

	const handleDisplayPropertyForm = (property, operation) => {
		
		let options =  {
			'operation': operation,
			'property': property
		}

		navigate('edit-property', { state: { options } })

	}

	console.log(properties)
	return (

		<div className='w-full mb-2'>
			{displayProperty != null &&
				<DisplayProperty property={displayProperty} displayProperty={setDisplayProperty} editProperty={handleDisplayPropertyForm} />
			}{properties !== { 'authorized_properties': undefined, 'owned_properties': undefined } &&
				<div> 
					{properties.owned_properties !== undefined && 
					<div>
						<div className='my-3'> Your Owned Properties </div>
						<PropertiesList properties={properties !== undefined||null ? properties.owned_properties : null} displayProperty={handleViewProperty} displayPropertyForm={handleDisplayPropertyForm} />
					</div>
					}

					{properties.authorized_properties !== undefined && 
							<div>
								<div className='my-3'> Your Authorized Properties </div>
								<PropertiesList properties={properties !== undefined||null ? properties.owned_properties : null} displayProperty={handleViewProperty} displayPropertyForm={handleDisplayPropertyForm} />
							</div>
					}
				</div>
			}
			{(properties.authorized_properties === undefined && properties.owned_properties === undefined) &&
				<div className='w-full h-screen flex items-center justify-center'>

					<UserLinks text={"You have no properties. Click here to add one!"} handleClick={handleAddProperty} />
				</div>
			}
			<div className='pb-2'>	
			</div>
		</div>
	)
}

export default PropertiesControl