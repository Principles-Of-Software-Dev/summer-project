import React, { useState, useEffect } from 'react'
import PropertiesList from './PropertiesList'
import { PropertyType } from '../../global/TypeDefs'
import DisplayProperty from './DisplayProperty';
import PropertyForm from './forms/PropertyForm';

const PropertiesControl = () => {
	const properties: PropertyType[] = [{
		propertyId: 1,
		street: '3455 Spring Cross Rd',
		city: 'Boca Raton',
		state: 'FL',
		zipcode: 39542,
		description: 'A beautiful house on the hill 1',
		estimate: 30000,
		photos: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg",
			"https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg",
			"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?cs=srgb&dl=pexels-expect-best-323780.jpg&fm=jpg"],
		videos: 'null'
	},
	{
		propertyId: 2,
		street: '3455 Spring Cross Rd',
		city: 'Boca Raton',
		state: 'FL',
		zipcode: 39542,
		description: 'A beautiful house on the hill 2',
		estimate: 30000,
		photos: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg",
			"https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg",
			"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?cs=srgb&dl=pexels-expect-best-323780.jpg&fm=jpg"],
		videos: 'null'
	},
	{
		propertyId: 3,
		street: '3455 Spring Cross Rd',
		city: 'Boca Raton',
		state: 'FL',
		zipcode: 39542,
		description: 'A beautiful house on the hill 3',
		estimate: 30000,
		photos: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg",
			"https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg",
			"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?cs=srgb&dl=pexels-expect-best-323780.jpg&fm=jpg"],
		videos: 'null'
	},{
		propertyId: 4,
		street: '3455 Spring Cross Rd',
		city: 'Boca Raton',
		state: 'FL',
		zipcode: 39542,
		description: 'A beautiful house on the hill 4',
		estimate: 30000,
		photos: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg",
			"https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg",
			"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?cs=srgb&dl=pexels-expect-best-323780.jpg&fm=jpg"],
		videos: 'null'
	}] ;
	const [displayProperty, setDisplayProperty] = useState(null);
	const [displayPropertyForm, setDisplayPropertyForm] = useState< {} |null>(null) ;

	useEffect(() => {
		if (displayProperty != null || displayPropertyForm != null) {
			document.body.style.overflow = "hidden" ;
		} else {
			document.body.style.overflow = "visible" ;
		}
	  }, [displayProperty , displayPropertyForm]) ;

	
	const handleViewProperty = property => { 
		setDisplayProperty(property) ; 
	}

	const handleDisplayPropertyForm = (property, operation) => {
		if (displayProperty != null) {
			setDisplayProperty(null); 
		}
		if (operation == null) {
			setDisplayPropertyForm(null);
		}
		else {
			setDisplayPropertyForm({
				'property': property,
				'operation': operation
			});
		}
	}


	return (
		<div className='w-full mb-2'>
			{displayProperty != null &&
				<DisplayProperty property={displayProperty} displayProperty={setDisplayProperty} editProperty={handleDisplayPropertyForm} />
			}
			{displayPropertyForm != null &&
				<PropertyForm options={displayPropertyForm} displayPropertyForm={handleDisplayPropertyForm} />
			}
				<PropertiesList properties={properties} displayProperty={handleViewProperty} displayPropertyForm={handleDisplayPropertyForm} />

			<div className='pb-2'>
				
			</div>
		</div>
	)
}

export default PropertiesControl