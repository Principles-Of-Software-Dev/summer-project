import React, { useState } from 'react' ;
import TextField from '../../sm_components/validator_fields/TextField' ;
import NumberField from '../../sm_components/validator_fields/NumberField' ;
import StateField from '../../sm_components/validator_fields/StateField' ;
import { useUser } from '../../../global/authorization/UserContext' ;
import Button from '../../sm_components/Button' ;



const PropertyForm = ({ options, displayPropertyForm }) => {

	const [validDescription, setValidDescription] = useState(false) ;
	const [validStreet, setValidStreet] = useState(false) ;
	const [validZip, setValidZip] = useState(false) ;
	const [validCity, setValidCity] = useState(false) ;
	const [validState, setValidState] = useState(false) ;
	const [validEstimate, setValidEstimate] = useState(false);
	
	const handleValidDescription = (set: boolean) => {
		console.log("Description" + set)
		setValidDescription(set);
	}
	const handleValidStreet = (set: boolean) => {
		console.log("Street" + set)
		setValidStreet(set);
	}
	const handleValidZip = (set: boolean) => {
		console.log("Zip" + set)
		setValidZip(set);
	}
	const handleValidCity = (set: boolean) => {
		console.log("City" + set)
		setValidCity(set);
	}
	const handleValidState = (set: boolean) => {
		console.log("State" + set)
		setValidState(set);
	}
	const handleValidEstimate = (set: boolean) => {
		console.log("Estimate" + set)
		setValidEstimate(set);
	}
	
	const { test } = useUser() ;

	// only require fields on add operation
	let required = options.operation === 'Add' ? true : false ;

	// Averts random errors
	const dummy = (bool) => { 

	}

	const handleCompleteForm = () => {

		if (validCity && validZip && validDescription && validState && validStreet && validEstimate) {
			return false ;
		} else {
			return true ;
		}
	}
  


	return (
		<div className='w-screen h-[90vh] flex items-center justify-center '>
			<div className='absolute z-20 bg-zinc-200 w-main h-[70vh]'>

				<form className='flex items-center justify-center w-full h-full'>
					{/* Start actual code. */}
					<div className='grid grid-cols-2 grid-rows-10 w-auto h-main bg-zinc-200'>
						<p className='flex items-center justify-center row-span-1 col-span-2'>
							{ options.operation} Property
						</p>
            
						{/* Description */}
						{ options.operation === 'Edit' ?
							<div className='flex items-center justify-center row-span-2 col-span-2'>
								<TextField text_length={50} required={required} setText={dummy} handleValid={handleValidDescription} type={"Description"} largeArea={true} storedVal={options.property.description} />
							</div> :
							<div className='flex items-center justify-center row-span-2 col-span-2'>
								<TextField text_length={50} required={required} setText={dummy} handleValid={handleValidDescription} type={"Description"} largeArea={true} />
							</div> 
						}


						{/* Street */}
						{ options.operation === 'Edit' ?
							<div className='flex items-center justify-center row-span-2 col-span-2'>
								<TextField text_length={25} required={required} setText={dummy} handleValid={handleValidStreet} type={"Street"} largeArea={false} storedVal={ options.property.street} />
							</div> :
							<div className='flex items-center justify-center row-span-2 col-span-2 w-full'>
								<TextField text_length={25} required={required} setText={dummy} handleValid={handleValidStreet} type={"Street"} largeArea={false} />
							</div> 
						}


			  {/* City */}
						{ options.operation === 'Edit' ?
							<div className='flex items-center justify-center row-span-2 col-span-1 w-full'>
								<TextField text_length={8} required={required} setText={dummy} handleValid={handleValidCity} type={"City"} largeArea={false} storedVal={options.property.city } />
							</div> :
							<div className='flex items-center justify-center row-span-2 col-span-1 w-full'>
								<TextField text_length={8} required={required} setText={dummy} handleValid={handleValidCity} type={"City"} largeArea={false} />
							</div> 
						}

				 {/* State */}
						<div className='flex items-center justify-center row-span-2 col-span-1 w-full'>
							<StateField required={required} handleValid={setValidState}/>
						</div>

						{/* Zip */}
						{ options.operation === 'Edit' ?
							<div className='flex items-center justify-center row-span-2 col-span-1 w-full'>
								<NumberField min_numb_length={5} max_numb_length={5} setNumb={dummy} handleValid={handleValidZip} type={"Zip Code"} required={required} storedVal={options.property.zipcode} />
							</div> :
							<div className='flex items-center justify-center row-span-2 col-span-1 w-full'>
								<NumberField min_numb_length={5} max_numb_length={5} setNumb={dummy} handleValid={handleValidZip} type={"Zip Code"} required={required}/>
							</div> 
						}

						{/* Estimate */}
						{ options.operation === 'Edit' ?
							<div className='flex items-center justify-center row-span-2 col-span-1 w-full'>
								<NumberField min_numb_length={4} max_numb_length={12} setNumb={dummy} handleValid={handleValidEstimate} type={"Estimate"} required={required} storedVal={options.property.estimate }/>
							</div> :
							<div className='flex items-center justify-center row-span-2 col-span-1 w-full'>
								<NumberField min_numb_length={4} max_numb_length={12} setNumb={dummy} handleValid={handleValidEstimate} type={"Estimate"} required={required}/>
							</div> 
						}
            
						<div className='flex items-center justify-end row-span-1 col-span-2 mx-4 my-2'>
							<Button
								height="h-xsmall-button"
								color='bg-zinc-400'
								buttonText='Submit'
								textColor='text-c-white'
								hoverColor='hover:bg-zinc-500'
								disable={handleCompleteForm()}
								// set later
								onClick={test}
							/>
							<Button
								height="h-xsmall-button"
								color='bg-zinc-400'
								buttonText='Cancel'
								textColor='text-c-white'
								hoverColor='hover:bg-zinc-500'
								disable={false}
								// set later
								onClick={() => displayPropertyForm(null, null)}
							/>
                  
						</div>


          
          
					</div>
					{/* End code. */}
				</form>




			</div>
		</div>
	)
}

export default PropertyForm