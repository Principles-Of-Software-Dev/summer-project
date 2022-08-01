import { createContext, useState, useContext, useEffect } from "react" ;
import { User } from "../TypeDefs" ;
import { useNavigate } from "react-router-dom" ;



export const UserContext = createContext<any>(null) ;

export const UserProvider = ({ children }) => {
	const [items, setItems] = useState<{'authorized_items': []| undefined,
	'owned_items': []| undefined}>({
		'authorized_items': undefined,
		'owned_items': undefined
	})

	const navigate = useNavigate() ;
	const [user, setUser] = useState<User>({
	})
	const [refreshUser, setRefreshUser] = useState(false) ;

	// Store user data on local memory on every update of user or user.authenticated.

	useEffect(() => {
		let stored = sessionStorage.getItem('GilderiseUser') ;
		setUser(stored == null ?
			{
				authenticated: true,
				id: -100,
			} :
			JSON.parse(stored)
		) ;
	}, [refreshUser]) ;

	useEffect(() => {
		sessionStorage.setItem('GilderiseUser', JSON.stringify(user)) ;

	}, [user, user.authenticated]) ;
	

	const setupAccount = (formData: FormData) => {

		// get userInfo 
		setRefreshUser(true) ;
		
		// set request options
		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			body: formData
		}

		const register = async () => {
			// send request
			await fetch("/setup_account", requestOptions).then(
				// after successful call to api, convert response to JSON
				response => {
					response.json().then(
						// get returned information
						data => { 
							// do stuff with returned information
							if (data.rsp_msg === 'user has been setup') {
								// alert user to check email.
								window.alert('Please check your email for login information') ;
							} else {
								// warn user registration failed
								window.alert('Something went wrong; please try again') ;
							}
						}
					)
				}
			).catch(e => {
				// general catch all
				console.log(e)
			})
		}

		// run api call
		setRefreshUser(false) ;
		register() ;

	}

	const editUser = (formData: FormData) => {
		// get userInfo 
		setRefreshUser(true) ;
		
		// set request options
		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			body: formData
		}
	
		const eUser = async () => {
			// send request
			await fetch("/edit_user", requestOptions).then(
				// after successful call to api, convert response to JSON
				response => {
					response.json().then(
						// get returned information
						data => { 
							// do stuff with returned information
							if (data.rsp_msg === 'User has been updated') {
								// alert user account update was successful.
								window.alert('Update Successful') ;
							} else if (data === 401) { 
								// email already exits in db
								window.alert("Email already exists on file. Please enter another email.")
									
							} else {
								// warn user of general failure
								window.alert('Something went wrong; please try again') ;
							}
						}
					)
				}
			).catch(e => {
				console.log(e)
			})
		}
	
		// run api call
		setRefreshUser(false) ;
		eUser() ;
	
		
	}

	const userLogin = (formData:FormData) => {
		// get userInfo 
		setRefreshUser(true) ;
		
		// set request options
		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			body: formData
		}

		const login = async () => {
			// send request
			await fetch("/login_user", requestOptions).then(
				// after successful call to api, convert response to JSON
				response => {
					response.json().then(
						// get returned information
						data => { 
							// do stuff with returned information
							if (data.user !== null || undefined) {
								// store user id
								setUser({
									authenticated: true,
									id: data.user.user_id
								})
								// navigate to dash or first-time account edit
								if (data.placeholder === 'placeholder') {
									let options = 'Setup' ;
									navigate('/account-preferences' , { state: { options } })
								} else {
									navigate('/dashboard')
								}
							} else {
								// warn user of general failure
								window.alert('Something went wrong; please try again') ;
							}
						}
					)
				}
			).catch(e => {
				console.log(e)
			})
		}

		// run api call
		setRefreshUser(false) ;
		login() ;
		
	} ;

	const getUser = () => {
		// get userInfo 
		setRefreshUser(true) ;

		const formData = new FormData() ;
		formData.append('user_id', user.id!.toString()) ;
		
		// set request options
		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			body: formData
		}

		const gUser= async () => {
			// send request
			await fetch("/get_user", requestOptions).then(
				// after successful call to api, convert response to JSON
				response => {
					response.json().then(
						// get returned information
						data => { 
							// do stuff with returned information
							if (data.user !== null || undefined) {
								// return user data
								return data.user
							} else {
								// warn user of general failure
								window.alert('Something went wrong; please try again') ;
							}
						}
					)
				}
			).catch(e => {
				console.log(e)
			})
		}

		// return async function
		setRefreshUser(false) ;
		return gUser() ;
	}


	const addItem = (formData: FormData) => {
		// get userInfo 
		setRefreshUser(true) ;
		
		// set request options
		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			body: formData
		}

		const aItem= async () => {
			// send request
			await fetch("/add_item", requestOptions).then(
				// after successful call to api, convert response to JSON
				response => {
					response.json().then(
						// get returned information
						data => { 
							// do stuff with returned information
							if (data.rsp_msg === 'item has been added') {
								// navigate back to dashboard
								navigate('/dashboard')
							} else {
								// warn user of general failure
								window.alert('Something went wrong; please try again') ;
							}
						}
					)
				}
			).catch(e => {
				console.log(e)
			})
		}

		// call api 
		setRefreshUser(false) ;
		aItem() ;
	}

	const editItem = (formData: FormData) => {
		// get userInfo 
		setRefreshUser(true) ;
		
		// set request options
		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			body: formData
		}

		const eItem= async () => {
			// send request
			await fetch("/edit_item", requestOptions).then(
				// after successful call to api, convert response to JSON
				response => {
					response.json().then(
						// get returned information
						data => { 
							// do stuff with returned information
							if (data.rsp_msg === 'item has been edited') {
								// navigate back to dashboard
								navigate('/dashboard')
							} else {
								// warn user of general failure
								window.alert('Something went wrong; please try again') ;
							}
						}
					)
				}
			).catch(e => {
				console.log(e)
			})
		}

		// call api 
		setRefreshUser(false) ;
		eItem() ;
	}

	const deleteItem = (formData: FormData) => {
		// get userInfo 
		setRefreshUser(true) ;
		
		// set request options
		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			body: formData
		}

		const dItem= async () => {
			// send request
			await fetch("/delete_item", requestOptions).then(
				// after successful call to api, convert response to JSON
				response => {
					response.json().then(
						// get returned information
						data => { 
							// do stuff with returned information
							if (data.rsp_msg === 'item has been deleted') {
								// navigate back to dashboard
								navigate('/dashboard')
							} else {
								// warn user of general failure
								window.alert('Something went wrong; please try again') ;
							}
						}
					)
				}
			).catch(e => {
				console.log(e)
			})
		}

		// call api 
		setRefreshUser(false) ;
		dItem() ;
	}
	
	const getItems = () => {
		// get userInfo 
		setRefreshUser(true) ;

		const formData = new FormData() ;
		formData.append('user_id', user.id!.toString()) ;
		
		// set request options
		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			body: formData
		}

		const gItems= async () => {
			// send request
			await fetch("/get_items", requestOptions).then(
				// after successful call to api, convert response to JSON
				response => {
					response.json().then(
						// get returned information
						data => { 
							// do stuff with returned information
							if (data.items !== null||undefined) {
								// return list of items
								return data.items
							} else {
								// warn user of general failure
								window.alert('Something went wrong; please try again') ;
							}
						}
					)
				}
			).catch(e => {
				console.log(e)
			})
		}

		// return async fucntion 
		setRefreshUser(false) ;
		return gItems() ;
	}

	const downloadItems = () => {
		// get userInfo 
		setRefreshUser(true) ;

		const formData = new FormData() ;
		formData.append('user_id', user.id!.toString()) ;
		
		// set request options
		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			body: formData
		}

		const gItems= async () => {
			// send request
			await fetch("/get_items_download", requestOptions).then(
				// after successful call to api, convert response to JSON
				response => {
					response.json().then(
						// get returned information
						data => { 
							// do stuff with returned information
							if (data.items !== null||undefined) {
								// return list of items
								return data.items
							} else {
								// warn user of general failure
								window.alert('Something went wrong; please try again') ;
							}
						}
					)
				}
			).catch(e => {
				console.log(e)
			})
		}

		// return async fucntion 
		setRefreshUser(false) ;
		return gItems() ;
	}
	

	return (
		<UserContext.Provider value={{
			user, items, setupAccount, editUser, userLogin, getUser,
			addItem, editItem, deleteItem, getItems, downloadItems
			
		}}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => useContext(UserContext) ;

export default UserContext ;
