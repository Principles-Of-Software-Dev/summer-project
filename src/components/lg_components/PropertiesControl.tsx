import React, { useState, useEffect } from 'react'
import PropertiesList from './PropertiesList'
import { PropertyType } from '../../global/TypeDefs'
import DisplayProperty from './DisplayProperty' ;

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
	const [displayProperty, setDisplayProperty] = useState(null) ;

	useEffect(() => {
		if (displayProperty != null) {
			document.body.style.overflow = "hidden" ;
		} else {
			document.body.style.overflow = "visible" ;
		}
	  }, [displayProperty]) ;

	const handleViewProperty = propertyId => { 
		setDisplayProperty(propertyId) ; 
	}


	return (
		<div className='w-full mb-2'>
			{displayProperty != null &&
				<DisplayProperty property={displayProperty} displayProperty={setDisplayProperty} />
			}
			<PropertiesList properties={properties} displayProperty={handleViewProperty} />
			<div className='pb-2'>
				Test 
			</div>
		</div>
	)
}

export default PropertiesControl