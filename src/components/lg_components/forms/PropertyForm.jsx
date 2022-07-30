import React, { useEffect, useRef, useState } from "react" ;
import { useNavigate } from "react-router-dom" ;
import { useUser } from "../../../global/authorization/UserContext" ;
import Button from "../../sm_components/Button" ;


const PropertyForm = ({ options }) => {

	useEffect(() => { 
	}, [])

	const { getAccessToken, user, editProperty, addProperty } = useUser() ;
	const estimation = useRef() ;
	const description = useRef() ;
	const street = useRef() ;
	const city = useRef() ;
	const zip = useRef() ;
	const state = useRef() ;
	const photos = useRef() ;
	const videos = useRef() ;

	const required = options.operation === 'Add' ? true : false ;
	const navigate = useNavigate() ;
	const [disableSubmit, setDisableSubmit] = useState(true) ;

	let formData ;

	let initalVals = options.property == null ? {
		'description': null,
		'estimation': null,
		'street': null,
		'city': null,
		'zip': null,
		'state': null,
		'photos': null,
		'videos': null,

	} : {
		'description': options.property.description,
		'estimation': options.property.estimate,
		'street': options.property.street,
		'city': options.property.city,
		'zip': options.property.zipcode,
		'state': options.property.state,
	}
	
	const valChanged = (e) => {
		e.preventDefault() ;
		setDisableSubmit(handleValidSubmit()) ;
	}

	const handleValidSubmit = () => {
		if (required && (
			estimation.current.value !== ("")
			&& street.current.value !== ("")
			&& city.current.value !==("")
			&& zip.current.value !== ("")
			&& state.current.value !== ("")
			&& photos.current.value !== ("")
			&& videos.current.value !== ("")
			&& description.current.value !== (""))) {
			console.log('ran') ;
			return false ;
		} else if (!required && (
			estimation.current.value != initalVals.estimation
			|| description.current.value != initalVals.description
			|| street.current.value != initalVals.street
			|| city.current.value != initalVals.city
			|| zip.current.value != initalVals.zip
			|| state.current.value != initalVals.state
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
		// add property all fields should contain something.
		if (options.operation === 'Add') {


			if (photos.current.value !== ("" || null || undefined) || videos.current.value !== ("" || null || undefined)) {

				if (photos.current.value !== ("" || null || undefined)) {
					for (let i = 0 ; i < document.forms["propertyForm"]["photos"].files.length ; i++) {
						formData.append('files', document.forms["propertyForm"]["photos"].files[i]) ;
					}
				}
				if (videos.current.value !== ("" || null || undefined)) {
					for (let i = 0 ; i < document.forms["propertyForm"]["videos"].files.length ; i++) {
						formData.append('files', document.forms["propertyForm"]["videos"].files[i]) ;
					}
				}
				formData.append('access_token', getAccessToken()) ;
				formData.append('property_id', null) ;
				formData.append('user_id', user.id)
			} else { 
				formData = null ;
			}

			addProperty(street.current.value, city.current.value, state.current.value, zip.current.value, description.current.value, estimation.current.value, formData)
			
		}
		// edit property
		else {
			let params = {
				'description': '',
				'estimation': 0,
				'street': '',
				'city': '',
				'zip': 0,
				'state': ''
			}

			if (estimation.current.value != initalVals.estimation) {
				params.estimation = estimation.current.value ;
			}
			if (description.current.value != initalVals.description) {
				params.description = description.current.value ;
			} if (street.current.value != initalVals.street) {
				params.street = street.current.value ; 
			} if (city.current.value != initalVals.city) {
				params.city = city.current.value ;
			} if (zip.current.value != initalVals.zip) { 
				params.zip = zip.current.value ;
			} if (state.current.value != initalVals.state) { 
				params.state = state.current.value ;
			}


			if (photos.current.value !== ("" || null || undefined) || videos.current.value !== ("" || null || undefined)) {

				if (photos.current.value !== ("" || null || undefined)) {
					for (let i = 0 ; i < document.forms["propertyForm"]["photos"].files.length ; i++) {
						formData.append('photos', document.forms["propertyForm"]["photos"].files[i]) ;
					}
				}
				if (videos.current.value !== ("" || null || undefined)) {
					for (let i = 0 ; i < document.forms["propertyForm"]["videos"].files.length ; i++) {
						formData.append('videos', document.forms["propertyForm"]["videos"].files[i]) ;
					}
				}
				formData.append('access_token', 10) ;
				formData.append('property_id', options.property.propertyId) ;
				formData.append('user_id', user.id)
			} else { 
				formData = null ;
			}
			// console.log("PropertyID: " + options.property.propertyId + "\nStreet" + params.street + "\nCity: " + params.city + "\nState : " + params.state + "\nZip: " + params.zip+ "\nDescription: "+ params.description+ "\nEstimation: "+ params.estimation+ "\nForm Data Photos: " +formData.getAll("photos")+ "\nForm Data Videos: " +formData.getAll("videos"))
			editProperty(options.property.propertyId, params.street, params.city, params.state, params.zip, params.description, params.estimation, formData) ;
		}

	}

	return (
		<div className="h-[53rem] w-full flex items-center justify-center ">
			<div className="h-main w-half min-w-[20rem] bg-zinc-200">

				<form id={'propertyForm'} name={'propertyForm'} className=' p-3 max-h-full max-w-full'>
					<div className="max-w-full p-3 max-h-full" >
						{/* Estimate */}
						<div className='w-full flex items-center justify-start my-2 '>
							<div className="grid grid-rows-3">
								<label htmlFor="estimation" className="row-span-1" > Home Worth</label>
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
										defaultValue={ options.property != null? options.property.estimate : null}
									/>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-2 grid-rows-3" >

							{/* Street */}
							<div className='w-full flex items-center justify-start my-1 col-span-2 row-span-1'>
								<div className="grid grid-rows-3 w-full">
									<label htmlFor="street" className="row-span-1" > Street</label>
									<input
										type='text'
										id="address"
										name="address"
										className="w-full rounded-md h-8 px-4 row-span-2 col-span-2"
										required={required}
										maxLength={35}
										minLength={10}
										onChange={valChanged}
										ref={street}
										defaultValue={ options.property != null? options.property.street : null}
									/>
								</div>
							</div>

							{/*  City */}
						
							<div className='h-auto w-full flex items-center justify-start my-1 col-span-1 row-span-1'>
								<div className="grid grid-rows-3 pr-2">
									<input
										type='text'
										id="city"
										name="city"
										className="w-full rounded-md h-8 px-4 row-span-2 "
										required={required}
										maxLength={20}
										minLength={4}
										onChange={valChanged}
										ref={city}
										defaultValue={ options.property != null? options.property.city : null}
									/>
									<label htmlFor="city" className="row-span-1" > City</label>
								</div>
							</div>

							{/* State */}
							<div className='h-auto w-full flex items-center justify-start my-1 col-span-1 row-span-1'>
								<div className="grid grid-rows-3 pl-2">
									<input
										type='text'
										id="state"
										name="state"
										className="w-full rounded-md h-8 px-4 row-span-2"
										required={required}
										maxLength={10}
										minLength={2}
										onChange={valChanged}
										ref={state}
										defaultValue={ options.property != null? options.property.state : null}
									/>
									<label htmlFor="state" className="row-span-1" > State</label>
								</div>
							</div>

							{/* Zip */}
							<div className='w-full flex items-center justify-start my-1 col-span-2 row-span-1'>
								<div className="grid grid-rows-3 w-full">
									<label htmlFor="zip" className="row-span-1" > Zip Code</label>
									<input
										type='number'
										id="zipcode"
										name="zipcode"
										className="w-full rounded-md h-8 px-4 row-span-2 col-span-2"
										required={required}
										maxLength={10}
										minLength={5}
										onChange={valChanged}
										ref={zip}
										defaultValue={ options.property != null? options.property.zipcode : null}
									/>
								</div>
							</div>

							{/* Description */}
							<div className='w-full flex items-center justify-start my-1 col-span-2 row-span-1'>
								<div className="grid grid-rows-3 w-full">
									<label htmlFor="description" className="row-span-1" > Description</label>
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
										defaultValue={ options.property != null? options.property.description : null}
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
                            		color='bg-zinc-400'
                            		buttonText='Submit'
                            		textColor='text-c-white'
                            		hoverColor='hover:bg-zinc-500'
                            		disable={disableSubmit}
                            		onClick={handleSubmit}
                            	/>
									<Button
                            		height="h-small-button"
                            		color='bg-zinc-400'
                            		buttonText='Cancel'
                            		textColor='text-c-white'
                            		hoverColor='hover:bg-zinc-500'
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

export default PropertyForm