import React from 'react'
import Item from '../sm_components/Item'


const ItemsList = ({ items, displayItem, displayItemForm }) => {
	return (
		<div className='grid md:grid md:grid-cols-3 grid-cols-1 h-auto w-screen mt-3'>
			{items.map((prop, numb) => {
				return (
					<div className='flex items-center justify-center h-main' key={numb}>
						<Item item={prop} displayItem={displayItem} displayItemForm={displayItemForm}  />
					</div>
				)
			}) }
          
		</div>
	)
}

export default ItemsList