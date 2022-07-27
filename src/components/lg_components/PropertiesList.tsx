import React from 'react'
import Property from '../sm_components/Property'


<<<<<<< HEAD
const PropertiesList = ({ properties, displayProperty }) => {
	return (
		<div className='grid md:grid md:grid-cols-3 grid-cols-1 h-auto w-screen'>
			{properties.map((prop, numb) => {
				return (
					<div className='flex items-center justify-center h-main' key={numb}>
						<Property property={prop} displayProperty={displayProperty}  />
					</div>
=======
const PropertiesList = ({ properties }) => {
	return (
		<div className='grid md:grid-cols-3 md:grid-rows-4 grid-cols-2 grid-rows-3 max-w-screen'>
			{properties.map((prop, numb) => {
				return (
					<Property property={prop} key={numb} />
>>>>>>> master
				)
			}) }
          
		</div>
	)
}

export default PropertiesList