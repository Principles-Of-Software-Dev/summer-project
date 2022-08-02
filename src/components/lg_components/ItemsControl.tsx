import React, { useState, useEffect } from 'react'
import ItemsList from './ItemsList'
import DisplayItem from './DisplayItem' ;
import { useNavigate } from 'react-router-dom' ;
import { useUser } from '../../global/authorization/UserContext' ;
import UserLinks from '../sm_components/UserLinks' ;

const ItemsControl = ({ handleAddItem,handleDeleteItem }) => {
	const { items, getItems } = useUser() ;
	const navigate = useNavigate() ;
	
	console.log((items !== { 'authorized_items': undefined, 'owned_items': undefined } && items != (undefined || null)))

	const [displayItem, setDisplayItem] = useState(null) ;
	

	useEffect(() => {
		if (displayItem != null) {
			document.body.style.overflow = "hidden" ;
		} else {
			document.body.style.overflow = "visible" ;
		}
	}, [displayItem]) ;
	

	
	const handleViewItem = item => { 
		setDisplayItem(item) ; 
	}

	const handleDisplayItemForm = (item, operation) => {
		
		let options =  {
			'operation': operation,
			'item': item
		}

		navigate('edit-item', { state: { options } })

	}

	return (

		<div className='w-full mb-2'>
			{displayItem != null &&
				<DisplayItem item={displayItem} displayItem={setDisplayItem} editItem={handleDisplayItemForm} deleteItem={handleDeleteItem} />
			}
			{(items !== { 'authorized_items': undefined, 'owned_items': undefined } && items != (undefined || null)) ?
				<div> 
					{items.owned_items !== undefined && 
					<div>
						<div className='my-3'> Your Owned Items </div>
						<ItemsList items={items !== undefined||null ? items.owned_items : null} displayItem={handleViewItem} displayItemForm={handleDisplayItemForm} />
					</div>
					}

					{items.authorized_items !== undefined && 
							<div>
								<div className='my-3'> Your Authorized Items </div>
								<ItemsList items={items !== undefined||null ? items.owned_items : null} displayItem={handleViewItem} displayItemForm={handleDisplayItemForm} />
							</div>
					}
				</div> : 
				<div className='hidden'></div>
			}
			{((items == (undefined||null)) || (items.authorized_items == undefined && items.owned_items == undefined)) &&
				<div className='w-full h-screen flex items-center justify-center'>

					<UserLinks text={"You have no items. Click here to add one!"} handleClick={handleAddItem} />
				</div>
			}
			<div className='pb-2'>	
			</div>
		</div>
	)
}

export default ItemsControl