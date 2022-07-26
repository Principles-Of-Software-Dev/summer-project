import React from 'react'
import Properties from './PropertiesList'
import { PropertyType } from '../../global/TypeDefs'

const PropertiesControl = () => {
	const properties: PropertyType[] = [{
		propertyId: 6,
		street: '3455 Spring Cross Rd',
		city: 'Boca Raton',
		state: 'FL',
		zipcode: 39542,
		description: 'A beautiful house on the hill',
		estimate: 30000,
		photos: ["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg",
			"https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg",
			"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?cs=srgb&dl=pexels-expect-best-323780.jpg&fm=jpg"],
		videos: 'null'
	}] ;

	return (
		<div className='w-full h-auto'>
			<Properties properties={properties}/>
		</div>
	)
}

export default PropertiesControl