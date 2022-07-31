import { createContext, useState, useContext, useEffect } from "react" ;
import { User } from "../TypeDefs" ;
import { useNavigate } from "react-router-dom" ;


let accessToken:(number | null) = null ;

const getAccessToken = () => {
	return accessToken ;
}

const setToken = (t:(number| null)) => {
	accessToken = t ;
}

// export const initializeUser:
// 	{
// 		user: User, accessToken: any, setUser: any, userLogin: any, userRegistration: any,
// 		userLogout: any, deleteUser: any, editUser: any, getUserInfo: any, addProperty: any,
// 		deleteProperty: any, editProperty: any, fetchProperties: any, refreshAccessToken: any,
// 		addPhotos:any,
// 		authorizeUser: any, deauthorizeUser: any, test: any, testToken: any,
// 	} = {
// 	user: {
// 		authenticated: false,
// 		id: -100
// 	},
// 	accessToken: getAccessToken(),
// 	setUser: (user: User) => { },
// 	userLogin: (email: string, password: string) => { },
// 	userRegistration: (firstName: string, lastName: string, dob: string, email: string, password: string) => { },
// 	userLogout: () => { },
// 	deleteUser: () => { },
// 	editUser: (firstName: string, lastName: string, dob: string, email: string, password: string) => { },
// 	getUserInfo: () => { },
// 	addProperty: (street: string, city: string, state: string, zipcode: number, description: string, estimate: number, formData:any) => { },
// 	deleteProperty: (propertyId: number) => { },
// 	editProperty: (propertyId: number, street: string, city: string, state: string, zipcode: string, description: string, estimate: string, formData:any) => { },
// 	fetchProperties: () => { },
// 	addPhotos: (formData:any) => { },
// 	refreshAccessToken: () => { },
// 	authorizeUser: () => { },
// 	deauthorizeUser: () => { },
// 	test: () => { },
// 	testToken: (t: any) => { },
// }

export const UserContext = createContext<any>(null) ;

export const UserProvider = ({ children }) => {

	const navigate = useNavigate() ;
	const [user, setUser] = useState<User>({}) ;
	const [refreshUser, setRefreshUser] = useState(false) ;

	// Store user data on local memory on every update of user or user.authenticated.

	useEffect(() => {
		const stored = sessionStorage.getItem('GilderiseUser') ;
		setUser(stored == null ?
			{
				authenticated: false,
				id: -100,
			} :
			JSON.parse(stored)) ;
	}, [refreshUser]) ;

	useEffect(() => {
		sessionStorage.setItem('GilderiseUser', JSON.stringify(user)) ;

	}, [user, user.authenticated]) ;
	
	// refresh the access token every minute if applicable. time is in milliseconds.
	useEffect(() => {
		const interval = setInterval(() => refreshAccessToken(), (60000 *14)) ;
		return () => clearInterval(interval) ;
	}, []) ;
	

	const userLogin = (email: string, password: string) => {
		setRefreshUser(true) ;
		const params = {
			'email': email,
			'password': password,
		}

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		}
	
		const login = async () => {
			await fetch("/login_user", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 402) {
							// warn user of unsuccessful registration attempt
							window.alert("Invalid email, please try again")
						} else if (data === 403) {
							// warn user of unsuccessful registration attempt
							window.alert("Invalid password, please try again")
						} else {
							setUser({
								'authenticated': true,
								'id': data.user_id
							})
							setToken(data.access_token) ;
							navigate("/dashboard") ;
						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		login() ;
		setRefreshUser(false) ;
		
	} ;

	const userRegistration = (firstName: string, lastName: string, email: string, password: string) => {
		setRefreshUser(true) ;

		const params = {
			'firstname': firstName,
			'lastname': lastName,
			'email': email,
			'password': password,
		}

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		}
	
		const register = async () => {
			await fetch("/add_user", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 401) {
							window.alert("Email is already on file. Please try again or use Forgot Password")
						 }
						else {
							setUser({
								'authenticated': true,
								'id': data.user_id,
							})
					
							setToken(data.access_token)
							navigate("/dashboard") ;
						} }
				})
			}).catch(e => {
				console.log(e)
			})
		}

		register() ;
		
		// warn user of unsuccessful registration attempt
		setRefreshUser(false) ;
	} ;

	const userLogout = () => {
		// Remove user info.
		setRefreshUser(true) ;
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
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
		setRefreshUser(false) ;
	} ;

	const deleteUser = () => {
		
		setRefreshUser(true) ;
		

		let atoken = getAccessToken() ;

		let params = {
			'user_id': user.id,
			'access_token': atoken,
		}

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		}

		const dUser = async () => {
			await fetch("/delete_user", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						userLogout() ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		dUser() ;
		setRefreshUser(false) ;

	} ;

	const editUser = (firstName: string, lastName: string, dob: string, email: string, password: string) => {

		setRefreshUser(true) ;
		
		let atoken = getAccessToken() ;

		let params = {
			'userid': user.id,
			'firstname': firstName,
			'lastname': lastName,
			'dob': dob,
			'email': email,
			'password': password,
			'access_token': atoken,

		}

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		}

		const eUser = async () => {
			await fetch("/edit_user", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 409) {
							userLogout() ;
						}
						else if (data === 401) {
							window.alert("Email is already in use!") ;
						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		setRefreshUser(true) ;

	} ;
	
	const getUserInfo = () => {
		setRefreshUser(true) ;

		let userInfo = {} ;

		let atoken = getAccessToken() ;

		let params = {
			'user_id': user.id,
			'access_token': atoken,

		}

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		}

		const gUser = async () => {
			await fetch("/get_user", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 409) {
							window.alert("Please Log In or Register") ;
							userLogout() ;
						}
						userInfo = data ;
						return userInfo ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		gUser() ;

		setRefreshUser(false) ;
		
	} ;

	const addProperty = async (street: string, city: string, state: string, zipcode: number, description: string, estimate: number, formData:any) => { 

		setRefreshUser(true);
		let atoken = getAccessToken();
		
		console.log(formData)

		let params = {
			'user_id': user.id,
			'street': street,
			'city': city,
			'state': state,
			'zipcode': zipcode,
			'description': description,
			'estimate': estimate,
			'access_token': atoken,
		}

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		}

		const aProp = async () => {
			await fetch("/add_property", requestOptions).then(response => {
				response.json().then( data => {
					if (data !== false) {
						if (data === 409) {
							userLogout() ;
						} else {
							console.log(formData)
							formData.append('property_id', data.property_id)
							const photoreq = new XMLHttpRequest();
							photoreq.open('POST', '/add_photos', true)
							photoreq.send(formData)
							const vidreq = new XMLHttpRequest();
							vidreq.open('POST', '/add_videos', true);
							vidreq.send(formData)
						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}
		 await aProp() ;
		
		setRefreshUser(false);
		navigate("/dashboard");
	} ;

	const deleteProperty = (propertyId: number) => { 
		setRefreshUser(true) ;

		let atoken = getAccessToken() ;

		let params = {
			'property_id': propertyId,
			'access_token': atoken,
		}

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		}

		const dProp = async () => {
			await fetch("/delete_property", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 409) {
							userLogout() ;
						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		dProp() ;

		setRefreshUser(false) ;
	} ;

	const editProperty = (propertyId: number, street: string, city: string, state: string, zipcode: string, description: string, estimate: string, formData) => { 
		setRefreshUser(true);

		let atoken = getAccessToken() ;

		let params = {
			'property_id': propertyId,
			'street': street,
			'city': city,
			'state': state,
			'zipcode': zipcode,
			'description': description,
			'estimate': estimate,
			'access_token': atoken,

		}

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		}

		const eProp = async () => {
			await fetch("/edit_property", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 409) {
							userLogout();
						} else { 
							if (formData.get('photos') !== (null || undefined || "")) {
							}
							if (formData.get('videos') !== (null || undefined || "")) {
							}
							navigate("/dashboard")
						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		eProp() ;

		setRefreshUser(false) ;

	} ;
	
	const addPhotos = (formData) => {
		setRefreshUser(true) ;

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: formData,
		}

		const addPhots = async () => {
			await fetch("/add_photos", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 409) {
							userLogout();
						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		setRefreshUser(false) ;
		return addPhots();
		
	}

	const addVideos = (formData) => {
		setRefreshUser(true) ;

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: formData,
		}

		const addVids = async () => {
			await fetch("/add_videos", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 409) {
							userLogout() ;
						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		setRefreshUser(false) ;

		return addVids() ;
	}

	const fetchProperties = () => { 
		setRefreshUser(true) ;

		let properties = {} ;
		
		let atoken = getAccessToken() ;
		
		let params = {
			'user_id': user.id,
			'access_token': atoken,
		}


		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)

		}

		const getProps = async () => {
			await fetch("/get_properties", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 409) {
							userLogout() ;
						} else if (data === 411)
						{ return { status :"No Properties" } ; }
						 else {
							properties = data ;
							return properties ;
						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		getProps() ;
		setRefreshUser(false) ;

	} ;
	
	const refreshAccessToken = () => { 
		setRefreshUser(true) ;
		
		let params = {
			'user_id' : user.id
		}

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		}


		const refreshAToken = async () => {
			await fetch("/refresh_access_token", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 408) {
							userLogout() ;
						}
						setToken(data.access_token) ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		refreshAToken() ;
		setRefreshUser(false) ;

	} ;
	
	const authorizeUser = (email: string) => {
		setRefreshUser(true) ;
		
		let atoken = getAccessToken() ;

		let params = {
			'user_id': user.id,
			'email_of_authorized': email,
			'access_token' : atoken
		}

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		}


		const authorize = async () => {
			await fetch("/authorize_user", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 409) {
							userLogout() ;
						}

					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		authorize() ;

		setRefreshUser(false) ;
	}
	
	const deauthorizeUser = (email: string) => {
		setRefreshUser(true) ;

		let atoken = getAccessToken() ;
		
		let params = {
			'user_id': user.id,
			'email_of_authorized': email,
			'access_token': atoken
		}

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		}


		const remove = async () => {
			await fetch("/deauthorize_user", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 409) {
							userLogout() ;
						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		remove() ;
		setRefreshUser(false) ;

	}
	
	const test = () => {
		setRefreshUser(true) ;
		const test = async () => await fetch("/hello").then(response => {
			response.json().then(data => {
				console.log(data.string)
			})
		}).catch(e => {
			console.log(e)
		})

		test() ;
		setRefreshUser(false) ;
	} ;

	const testToken = (t: any) => {
		setToken(t) ;
	} ;

	

	return (
		<UserContext.Provider value={{
			user, getAccessToken, userLogin, userRegistration, userLogout,
			deleteUser, editUser, getUserInfo, addProperty,
			deleteProperty, editProperty, fetchProperties,
			refreshAccessToken, authorizeUser, deauthorizeUser,
			test, testToken
		}}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => useContext(UserContext) ;

export default UserContext ;
