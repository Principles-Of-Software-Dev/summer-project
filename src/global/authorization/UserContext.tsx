import { createContext, useState, useContext, useEffect } from "react" ;
import { User } from "../TypeDefs" ;
import { useNavigate } from "react-router-dom" ;
import Dashboard from "../../pages/Dashboard" ;



export const UserContext = createContext<any>(null) ;

export const UserProvider = ({ children }) => {
	const [items, setItems] = useState<{
		'owned_items': [] | undefined,
		'authorized_items': [] | undefined	
	}>({
		'owned_items': undefined,
		'authorized_items': undefined
		
	})

	const [userInfo, setUserInfo] = useState(null) ;

	const navigate = useNavigate() ;
	const [user, setUser] = useState<User>({
	})

	useEffect(() => {
		let stored = sessionStorage.getItem('GilderiseUser') ;
		setUser(stored == null ?
			{
				authenticated: false,
				id: -100,
			} :
			JSON.parse(stored)
		) ;

	}, [])
	// Store user data on local memory on every update of user or user.authenticated.


	useEffect(() => {
		sessionStorage.setItem('GilderiseUser', JSON.stringify(user)) ;

	}, [user, user.authenticated]) ;
	

	const setupAccount = (formData: FormData) => {

		
		// // set request options
		// let requestOptions = {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "multipart/form-data"
		// 	},
		// 	body: formData
		// }

		const register = () => {

			const xhr = new XMLHttpRequest() ;
			// send request and and wait unitl we get a response
			xhr.open('POST', '/setup_account', false)
			xhr.send(formData) ;
			
			// convert response to object format
			let data = JSON.parse(xhr.response)

			// do stuff with response
			if (data.rsp_msg === 'user has been setup') {
				// alert user to check email.
				window.alert('Please check your email for login information') ;
			} else {
				// warn user registration failed
				window.alert('Something went wrong; please try again') ;
			}

			
			// does not work when reading form data in flask. see above
			// // send request
			// await fetch("/setup_account", requestOptions).then(
			// 	// after successful call to api, convert response to JSON
			// 	response => {
			// 		response.json().then(
			// 			// get returned information
			// 			data => { 
			// 				// do stuff with returned information
			// 				if (data.rsp_msg === 'user has been setup') {
			// 					// alert user to check email.
			// 					window.alert('Please check your email for login information') ;
			// 				} else {
			// 					// warn user registration failed
			// 					window.alert('Something went wrong; please try again') ;
			// 				}
			// 			}
			// 		)
			// 	}
			// ).catch(e => {
			// 	// general catch all
			// 	console.log(e)
			// })
		}

		// run api call
		register() ;

	}

	const editUser = (formData: FormData) => {
		
		// // set request options
		// let requestOptions = {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "multipart/form-data"
		// 	},
		// 	body: formData
		// }
	
		const eUser = () => {

			const xhr = new XMLHttpRequest() ;
			// send request and and wait unitl we get a response
			xhr.open('POST', '/edit_user', false)
			xhr.send(formData) ;
			
			// convert response to object format
			let data = JSON.parse(xhr.response)
			let temp_id = formData.get('user_id') ;

			// do stuff with response
			if (data.rsp_msg === 'User has been updated') {
				// alert user account update was successful.
				window.alert('Update Successful') ;
				getItems(temp_id) ;
				navigate('/dashboard')
				
			} else if (data === 401) { 
				// email already exits in db
				window.alert("Email already exists on file. Please enter another email.")
					
			} else {
				// warn user of general failure
				window.alert('Something went wrong; please try again') ;
			}

			// // send request
			// await fetch("/edit_user", requestOptions).then(
			// 	// after successful call to api, convert response to JSON
			// 	response => {
			// 		response.json().then(
			// 			// get returned information
			// 			data => { 
			// 				// do stuff with returned information
			// 				if (data.rsp_msg === 'User has been updated') {
			// 					// alert user account update was successful.
			// 					window.alert('Update Successful') ;
			// 					navigate('/dashboard')
								
			// 				} else if (data === 401) { 
			// 					// email already exits in db
			// 					window.alert("Email already exists on file. Please enter another email.")
									
			// 				} else {
			// 					// warn user of general failure
			// 					window.alert('Something went wrong; please try again') ;
			// 				}
			// 			}
			// 		)
			// 	}
			// ).catch(e => {
			// 	console.log(e)
			// })
		}
	
		// run api call
		eUser() ;
	
		
	}

	const userLogin = (formData:FormData) => {
		// get userInfo 
		
		// set request options
		// let requestOptions = {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "multipart/form-data"
		// 	},
		// 	body: formData
		// }

		const login = () => {

			const xhr = new XMLHttpRequest() ;
			// send request and and wait unitl we get a response
			xhr.open('POST', '/login_user', false)
			xhr.send(formData) ;
			let data = JSON.parse(xhr.response)

			if (data.user !== null || undefined) {
				// store user id
				setUser({
					authenticated: true,
					id: data.user.id_user
				})
				let temp_id = data.user.id_user
				

				// navigate to dash or first-time account edit
				if (data.user.setup_complete === 'false') {
					let options = {
						'operation': 'Setup',
						'userInfo': data.user
					} 
					navigate('/account-preferences' , { state: { options } })
				} else {
					
					getItems(temp_id) ;
					
					navigate('/dashboard')
				}
			} else {
				// warn user of general failure
				window.alert('Something went wrong; please try again') ;
			}


			// // send request
			// await fetch("/login_user", requestOptions).then(
			// 	// after successful call to api, convert response to JSON
			// 	response => {
			// 		response.json().then(
			// 			// get returned information
			// 			data => { 
			// 				// do stuff with returned information
			// 				if (data.user !== null || undefined) {
			// 					// store user id
			// 					setUser({
			// 						authenticated: true,
			// 						id: data.user.user_id
			// 					})
			// 					// navigate to dash or first-time account edit
			// 					if (data.setup_complete === 'false') {
			// 						let options = 'Setup' ;
			// 						navigate('/account-preferences' , { state: { options } })
			// 					} else {
			// 						navigate('/dashboard')
			// 					}
			// 				} else {
			// 					// warn user of general failure
			// 					window.alert('Something went wrong; please try again') ;
			// 				}
			// 			}
			// 		)
			// 	}
			// ).catch(e => {
			// 	console.log(e)
			// })
		}

		// run api call
		login() ;
		
	} ;

	const getUser = (id) => {
		// get userInfo 

		const formData = new FormData() ;
		
		formData.append('user_id', id.toString()) ;
		
		// set request options
		// let requestOptions = {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "multipart/form-data"
		// 	},
		// 	body: formData
		// }

		const gUser = () => {

			const xhr = new XMLHttpRequest() ;
			// send request and and wait unitl we get a response
			xhr.open('POST', '/get_user', false)
			xhr.send(formData) ;
			let data = JSON.parse(xhr.response)

			// do stuff with returned information
			if (data.user !== null || undefined) {
				// return user data
				setUserInfo(data.user)
			} else {
				// warn user of general failure
				window.alert('Something went wrong; please try again') ;
			}

			// // send request
			// await fetch("/get_user", requestOptions).then(
			// 	// after successful call to api, convert response to JSON
			// 	response => {
			// 		response.json().then(
			// 			// get returned information
			// 			data => { 
			// 				// do stuff with returned information
			// 				if (data.user !== null || undefined) {
			// 					// return user data
			// 					setUserInfo( data.user)
			// 				} else {
			// 					// warn user of general failure
			// 					window.alert('Something went wrong; please try again') ;
			// 				}
			// 			}
			// 		)
			// 	}
			// ).catch(e => {
			// 	console.log(e)
			// })
		}

		// return async function
		gUser() ;
	}

	const userLogout = () => {
		
		let params = {
			'user_id': user.id,
		}

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		}

		const logout = async () => {
			await fetch("/logout_user", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						setUser({
							'authenticated': false,
							'id': undefined
						})
						
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		logout() ;
	} ;

	const addItem = (formData: FormData) => {
		// get userInfo 
		
		// set request options
		// let requestOptions = {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "multipart/form-data"
		// 	},
		// 	body: formData
		// }

		const aItem = () => {
			
			const xhr = new XMLHttpRequest() ;
			// send request and and wait unitl we get a response
			xhr.open('POST', '/add_item', false)
			xhr.send(formData) ;
			let data = JSON.parse(xhr.response)
			let temp_id = formData.get('user_id') ;
			// do stuff with returned information
			if (data.rsp_msg === 'item has been added') {
				// navigate back to dashboard
				getItems(temp_id) ;
				navigate('/dashboard')
			} else {
				// warn user of general failure
				window.alert('Something went wrong; please try again') ;
			}

			// // send request
			// await fetch("/add_item", requestOptions).then(
			// 	// after successful call to api, convert response to JSON
			// 	response => {
			// 		response.json().then(
			// 			// get returned information
			// 			data => { 
			// 				// do stuff with returned information
			// 				if (data.rsp_msg === 'item has been added') {
			// 					// navigate back to dashboard
			// 					navigate('/dashboard')
			// 				} else {
			// 					// warn user of general failure
			// 					window.alert('Something went wrong; please try again') ;
			// 				}
			// 			}
			// 		)
			// 	}
			// ).catch(e => {
			// 	console.log(e)
			// })
		}

		// call api 
		aItem() ;
	}

	const editItem = (formData: FormData) => {

		
		// set request options
		// let requestOptions = {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "multipart/form-data"
		// 	},
		// 	body: formData
		// }

		const eItem = () => {
			
			const xhr = new XMLHttpRequest() ;
			// send request and and wait unitl we get a response
			xhr.open('POST', '/edit_item', false)
			xhr.send(formData) ;
			let data = JSON.parse(xhr.response)
			let temp_id = formData.get('user_id') ;

			// do stuff with returned information
			if (data.rsp_msg === 'item has been edited') {
				// navigate back to dashboard
				getItems(temp_id) ;
				navigate('/dashboard')
			} else {
				// warn user of general failure
				window.alert('Something went wrong; please try again') ;
			}

			// // send request
			// await fetch("/edit_item", requestOptions).then(
			// 	// after successful call to api, convert response to JSON
			// 	response => {
			// 		response.json().then(
			// 			// get returned information
			// 			data => { 
			// 				// do stuff with returned information
			// 				if (data.rsp_msg === 'item has been edited') {
			// 					// navigate back to dashboard
			// 					navigate('/dashboard')
			// 				} else {
			// 					// warn user of general failure
			// 					window.alert('Something went wrong; please try again') ;
			// 				}
			// 			}
			// 		)
			// 	}
			// ).catch(e => {
			// 	console.log(e)
			// })
		}

		// call api 
		eItem() ;
	}

	const deleteItem = (formData: FormData) => {
		
		// set request options
		// let requestOptions = {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "multipart/form-data"
		// 	},
		// 	body: formData
		// }

		const dItem = () => {

			const xhr = new XMLHttpRequest() ;
			// send request and and wait unitl we get a response
			xhr.open('POST', '/delete_item', false)
			xhr.send(formData) ;
			let data = JSON.parse(xhr.response)
			let temp_id = formData.get('user_id') ;

			// do stuff with returned information
			if (data.rsp_msg === 'item has been deleted') {
				// navigate back to dashboard
				getItems(temp_id) ;
				navigate('/dashboard')
			} else {
				// warn user of general failure
				window.alert('Something went wrong; please try again') ;
			}
			
			// // send request
			// await fetch("/delete_item", requestOptions).then(
			// 	// after successful call to api, convert response to JSON
			// 	response => {
			// 		response.json().then(
			// 			// get returned information
			// 			data => { 
			// 				// do stuff with returned information
			// 				if (data.rsp_msg === 'item has been deleted') {
			// 					// navigate back to dashboard
			// 					navigate('/dashboard')
			// 				} else {
			// 					// warn user of general failure
			// 					window.alert('Something went wrong; please try again') ;
			// 				}
			// 			}
			// 		)
			// 	}
			// ).catch(e => {
			// 	console.log(e)
			// })
		}

		// call api 
		dItem() ;
	}
	
	const getItems = (id) => {
		// get userInfo 

		const formData = new FormData() ;
		formData.append('user_id', id.toString()) ;
		
		// set request options
		// let requestOptions = {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "multipart/form-data"
		// 	},
		// 	body: formData
		// }

		const gItems = () => {
			const xhr = new XMLHttpRequest() ;
			// send request and and wait unitl we get a response
			xhr.open('POST', '/get_items', false)
			xhr.send(formData) ;
			let data = JSON.parse(xhr.response)

			// do stuff with returned information
			if (data.items !== null||undefined) {
				// return list of items
				setItems(data.items)
			} else {
				// warn user of general failure
				window.alert('Something went wrong; please try again') ;
			}


			// // send request
			// await fetch("/get_items", requestOptions).then(
			// 	// after successful call to api, convert response to JSON
			// 	response => {
			// 		response.json().then(
			// 			// get returned information
			// 			data => { 
			// 				// do stuff with returned information
			// 				if (data.items !== null||undefined) {
			// 					// return list of items
			// 					setItems(data.items)
			// 				} else {
			// 					// warn user of general failure
			// 					window.alert('Something went wrong; please try again') ;
			// 				}
			// 			}
			// 		)
			// 	}
			// ).catch(e => {
			// 	console.log(e)
			// })
		}

		// return async fucntion 
		gItems() ;
	}

	const downloadItems = () => {


		const formData = new FormData() ;
		formData.append('user_id', user.id!.toString()) ;
		
		// // set request options
		// let requestOptions = {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "multipart/form-data"
		// 	},
		// 	body: formData
		// }

		const gItems = () => {

			const xhr = new XMLHttpRequest() ;
			// send request and and wait unitl we get a response
			xhr.open('POST', '/get_items_download', false)
			xhr.send(formData) ;
			let data = JSON.parse(xhr.response)

			// do stuff with returned information
			if (data.items !== null||undefined) {
				// return list of items
				return data.items
			} else {
				// warn user of general failure
				window.alert('Something went wrong; please try again') ;
			}

			// // send request
			// await fetch("/get_items_download", requestOptions).then(
			// 	// after successful call to api, convert response to JSON
			// 	response => {
			// 		response.json().then(
			// 			// get returned information
			// 			data => { 
			// 				// do stuff with returned information
			// 				if (data.items !== null||undefined) {
			// 					// return list of items
			// 					return data.items
			// 				} else {
			// 					// warn user of general failure
			// 					window.alert('Something went wrong; please try again') ;
			// 				}
			// 			}
			// 		)
			// 	}
			// ).catch(e => {
			// 	console.log(e)
			// })
		}

		// return async fucntion 
		return gItems() ;
	}


	

	return (
		<UserContext.Provider value={{
			user, userInfo, items, setupAccount, editUser, userLogin, getUser,
			userLogout, addItem, editItem, deleteItem, getItems, downloadItems
			
		}}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => useContext(UserContext) ;

export default UserContext ;
