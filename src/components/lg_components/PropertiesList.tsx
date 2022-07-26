import React from 'react'
import Property from '../sm_components/Property'


const PropertiesList = ({ properties }) => {
	return (
		<div className='grid md:grid-cols-3 md:grid-rows-4 grid-cols-2 grid-rows-3 max-w-screen'>
			{properties.map((prop, numb) => {
				return (
					<Property property={prop} key={numb} />
				)
			}) }
          
		</div>
	)
}

export default PropertiesList