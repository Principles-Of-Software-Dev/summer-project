import React, { useState, useEffect } from 'react'
import PropertiesList from './PropertiesList'
import { PropertyType } from '../../global/TypeDefs'
import DisplayProperty from './DisplayProperty' ;
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../global/authorization/UserContext';

const PropertiesControl = () => {
	const navigate = useNavigate();
	const { fetchProperties } = useUser();
	let properties: ({'owned_properties':PropertyType[], 'authorized_properties':PropertyType[]} | undefined);
	const [displayProperty, setDisplayProperty] = useState(null) ;

	useEffect(() => {
		if (displayProperty != null ) {
			document.body.style.overflow = "hidden" ;
		} else {
			document.body.style.overflow = "visible" ;
		}
	}, [displayProperty]);
	
	useEffect(() => { 
		properties = fetchProperties();
	},[ ])

	
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


	return (
		<div className='w-full mb-2'>
			{displayProperty != null &&
				<DisplayProperty property={displayProperty} displayProperty={setDisplayProperty} editProperty={handleDisplayPropertyForm} />
			}
			{properties?.owned_properties && 
				<div>
				<div className='my-3'> Your Owned Properties </div>
				<PropertiesList properties={properties != undefined ? properties.owned_properties : null} displayProperty={handleViewProperty} displayPropertyForm={handleDisplayPropertyForm} />
				</div>
			}

			{properties?.authorized_properties && 
						<div>
						<div className='my-3'> Your Authorized Properties </div>
						<PropertiesList properties={properties != undefined ? properties.owned_properties : null} displayProperty={handleViewProperty} displayPropertyForm={handleDisplayPropertyForm} />
						</div>
					}
			<div className='pb-2'>	
			</div>
		</div>
	)
}

export default PropertiesControl