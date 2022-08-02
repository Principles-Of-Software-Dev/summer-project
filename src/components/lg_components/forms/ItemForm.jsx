import React, { useRef, useState } from "react" ;
import { useNavigate } from "react-router-dom" ;
import { useUser } from "../../../global/authorization/UserContext" ;
import Button from "../../sm_components/Button" ;


const ItemForm = ({ options }) => {

	const { user, editItem, addItem } = useUser() ;
	const estimation = useRef() ;
	const description = useRef() ;
	const name = useRef()
	const photos = useRef() ;
	const videos = useRef() ;

	const required = options.operation === 'Add' ? true : false ;
	const navigate = useNavigate() ;
	const [disableSubmit, setDisableSubmit] = useState(true) ;

	let formData ;

	let initalVals = options.item == null ? {
		'description': null,
		'estimation': null,
		'name': null,
		'photos': null,
		'videos': null,

	} : {
		'name': options.item.name,
		'description': options.item.description,
		'estimation': options.item.estimate,
	}
	
	const valChanged = (e) => {
		e.preventDefault() ;
		setDisableSubmit(handleValidSubmit()) ;
	}

	const handleValidSubmit = () => {
		if (required && (
			estimation.current.value !== ("")
			&& name.current.value !== ("")
			&& photos.current.value !== ("")
			&& videos.current.value !== ("")
			&& description.current.value !== (""))) {
			console.log('ran') ;
			return false ;
		} else if (!required && (
			estimation.current.value !== initalVals.estimation
			|| description.current.value !== initalVals.description
			|| name.current.value !== initalVals.name
			|| photos.current.value !== ("")
			|| videos.current.value !== ("")
		)) {
			return false ;
		}
		return true ;
	}

	const handleSubmit = (e) => {
		formData = new FormData() ;

		e.preventDefault()
		// add item all fields should contain something.
		if (options.operation === 'Add') {


			if (photos.current.value !== ("" || null || undefined) || videos.current.value !== ("" || null || undefined)) {

				if (photos.current.value !== ("" || null || undefined)) {
					for (let i = 0 ; i < document.forms["itemForm"]["photos"].files.length ; i++) {
						formData.append('photos', document.forms["itemForm"]["photos"].files[i]) ;
					}
				}
				if (videos.current.value !== ("" || null || undefined)) {
					for (let i = 0 ; i < document.forms["itemForm"]["videos"].files.length ; i++) {
						formData.append('videos', document.forms["itemForm"]["videos"].files[i]) ;
					}
				}
			}

			formData.append('name', name.current.value)
			formData.append('description', description.current.value)
			formData.append('estimate', estimation.current.value)
			formData.append('user_id', user.id)

			addItem(formData) ;
			
		}
		// edit item
		else {
			let params = {
				'description': '',
				'estimation': 0,
				'name': '',
			}

			if (estimation.current.value !== initalVals.estimation) {
				params.estimation = estimation.current.value ;
			}
			if (description.current.value !== initalVals.description) {
				params.description = description.current.value ;
			}
			if (name.current.value !== initalVals.name) {
				params.name = name.current.value ;
			}


			if (photos.current.value !== ("" || null || undefined) || videos.current.value !== ("" || null || undefined)) {

				if (photos.current.value !== ("" || null || undefined)) {
					for (let i = 0 ; i < document.forms["itemForm"]["photos"].files.length ; i++) {
						formData.append('photos', document.forms["itemForm"]["photos"].files[i]) ;
					}
				}
				if (videos.current.value !== ("" || null || undefined)) {
					for (let i = 0 ; i < document.forms["itemForm"]["videos"].files.length ; i++) {
						formData.append('videos', document.forms["itemForm"]["videos"].files[i]) ;
					}
				}
			} 
			formData.append('description', params.description)
			formData.append('estimate', params.estimation)
			formData.append('name', params.name)

			formData.append('item_id', options.item.itemId) ;
			formData.append('user_id', user.id)
			// console.log("ItemID: " + options.item.itemId + "\nStreet" + params.street + "\nCity: " + params.city + "\nState : " + params.state + "\nZip: " + params.zip+ "\nDescription: "+ params.description+ "\nEstimation: "+ params.estimation+ "\nForm Data Photos: " +formData.getAll("photos")+ "\nForm Data Videos: " +formData.getAll("videos"))
			editItem(formData)
		}

	}

	return (
		<div className="h-auto w-full flex items-center justify-center ">
			<div className="h-main w-half min-w-[20rem] bg-sky-200 rounded-3xl">

				<form id={'itemForm'} name={'itemForm'} className=' p-3 max-h-full max-w-full'>
					<div className="max-w-full p-3 max-h-full" >
						{/* Estimate */}
						<div className='w-full flex items-center justify-start my-2 '>
							<div className="grid grid-rows-3 w-full">
								<label htmlFor="name" className="row-span-1" > Name of the item</label>
								<textarea
									id="name"
									name="name"
									className="w-full rounded-md px-4 row-span-2 col-span-2"
									required={required}
									minLength={5}
									maxLength={15}
									onChange={valChanged}
									ref={name}
									defaultValue={ options.item != null? options.item.name : null}
								/>
							</div>
							<div className="grid grid-rows-3">
								<label htmlFor="estimation" className="row-span-1" > How much is your item worth?</label>
								<div className="relative">
									<div className="absolute left-0 top-1"> $</div>
									<input
										type='number'
										id="estimation"
										name="estimation"
										className="md:w-[20rem] w-main rounded-md h-8 px-4 row-span-2"
										placeholder="Enter in an estimate of your home's worth"
										required={required}
										maxLength={15}
										minLength={4}
										onChange={valChanged}
										ref={estimation}
										defaultValue={ options.item != null? options.item.estimate : null}
									/>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-2 grid-rows-3" >

							{/* Description */}
							<div className='w-full flex items-center justify-start my-1 col-span-2 row-span-1'>
								<div className="grid grid-rows-3 w-full">
									<label htmlFor="description" className="row-span-1" > Brief description of the item</label>
									<textarea
										id="description"
										name="description"
										className="w-full rounded-md px-4 row-span-2 col-span-2"
										required={required}
										cols={22}
										rows={3}
										minLength={10}
										maxLength={65}
										onChange={valChanged}
										ref={description}
										defaultValue={ options.item != null? options.item.description : null}
									/>
								</div>
							</div>

							{/* Photos */}
							<div className="col-span-2">
								<div className='w-full flex items-center justify-start my-1'>
									<div className="grid grid-rows-3 w-full">
										<label htmlFor="photos" className="row-span-1" > Upload Photos</label>
										<input
											type='file'
											id="photos"
											required={required}
											name="photos"
											className="w-full rounded-md h-8 px-4 row-span-2 col-span-2"
											ref={photos}
											onChange={valChanged}
											multiple
										/>
									</div>
								</div>
						
							</div>

							{/* Videos */}
							<div className="col-span-2">
								<div className='w-full flex items-center justify-start my-1'>
									<div className="grid grid-rows-3 w-full">
										<label htmlFor="videos" className="row-span-1" > Upload Videos</label>
										<input
											type='file'
											id="videos"
											required={required}
											name="videos"
											className="w-full rounded-md h-8 px-4 row-span-2 col-span-2"
											ref={videos}
											onChange={valChanged}
											multiple
										/>
									</div>
								</div>
						
							</div>
							
							{/* Cancel and Submit Buttons */}
							<div className="col-span-2">
								<div className='w-full flex items-center justify-end my-1'>
									<Button
                            		height="h-small-button"
                            		color='bg-sky-400'
                            		buttonText='Submit'
                            		textColor='text-c-white'
                            		hoverColor='hover:bg-sky-500'
                            		disable={disableSubmit}
                            		onClick={handleSubmit}
                            	/>
									<Button
                            		height="h-small-button"
                            		color='bg-sky-400'
                            		buttonText='Cancel'
                            		textColor='text-c-white'
                            		hoverColor='hover:bg-sky-500'
                            		disable={false}
                            		onClick={() => navigate(-1)}
                            	/>
								</div>
						
							</div>
						</div>
					</div>

				</form>

			</div>

		</div>
	)
}

export default ItemForm