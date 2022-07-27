import React from 'react'
import Property from '../sm_components/Property'


const PropertiesList = ({ properties, displayProperty }) => {
	return (
		<div className='grid md:grid md:grid-cols-3 grid-cols-1 h-auto w-screen'>
			{properties.map((prop, numb) => {
				return (
					<div className='flex items-center justify-center h-main' key={numb}>
						<Property property={prop} displayProperty={displayProperty}  />
					</div>
				)
			}) }
          
		</div>
	)
}

export default PropertiesList