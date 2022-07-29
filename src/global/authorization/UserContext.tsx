import { createContext, useState, useContext, useEffect } from "react" ;
import { User } from "../TypeDefs" ;
import { useNavigate } from "react-router-dom" ;


let accessToken = null ;

const getAccessToken = () => {
	return accessToken ;
}

const setToken = (t:any) => {
	accessToken = t ;
}

export const initializeUser:
	{
		user: User, accessToken: any, setUser: any, userLogin: any, userRegistration: any,
		userLogout: any, deleteUser: any, editUser: any, getUserInfo: any, addProperty: any,
		deleteProperty: any, editProperty: any, fetchProperties: any, refreshAccessToken: any,
		authorizeUser: any, deauthorizeUser: any, test: any, testToken: any,
	} =
{
	user: {
		authenticated: false,
		id: undefined
	},
	accessToken: getAccessToken(),
	setUser: (user: User) => { },
	userLogin: (email: string, password: string) => { },
	userRegistration: (firstName: string, lastName: string, dob: string, email: string, password: string) => { },
	userLogout: () => { },
	deleteUser: () => { },
	editUser: (firstName: string, lastName: string, dob: string, email: string, password: string) => { },
	getUserInfo: () => { },
	addProperty: (street: string, city: string, state: string, zipcode: number, description: string, estimate: number, photos: any, videos: any) => { },
	deleteProperty: (propertyId: number) => { },
	editProperty: (propertyId: number, street: string, city: string, state: string, zipcode: string, description: string, estimate: string, photos: any, videos: any) => { },
	fetchProperties: () => { },
	refreshAccessToken: () => { },
	authorizeUser: () => { },
	deauthorizeUser: () => { },
	test: () => { },
	testToken: (t: any) => { },
}

export const UserContext = createContext<any>(initializeUser) ;

export const UserProvider = ({ children }) => {

	const navigate = useNavigate() ;
	const stored = sessionStorage.getItem('GilderiseUser') ;
	const [user, setUser] = useState<User>( stored == null ?
		{
			authenticated: false,
			id: undefined,
		} :
		JSON.parse(stored)) ;

	// Store user data on local memory on every update of user or user.authenticated.
	useEffect(() => {
		sessionStorage.setItem('GilderiseUser', JSON.stringify(user)) ;

	}, [user, user.authenticated]) ;
	
	// refresh the access token every minute if applicable. time is in milliseconds.
	useEffect(() => {
		const interval = setInterval(() => refreshAccessToken(), (60000 *14)) ;
		return () => clearInterval(interval) ;
	  }, []) ;

	const userLogin = (email: string, password: string) => {

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
						setUser({
							'authenticated': true,
							'id': data.user_id
						})
						setToken(data.access_token) ;
						navigate("/dashboard") ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		login() ;
		
		// warn user of unsuccessful registration attempt
		window.alert("Invalid Login")
		
	} ;

	const userRegistration = (firstName: string, lastName: string, email: string, password: string) => {
		

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
						setUser({
							'authenticated': true,
							'id': data.user_id,
						})
						setToken(data.access_token)
						navigate("/dashboard") ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		register() ;
		
		// warn user of unsuccessful registration attempt
		
	} ;

	const userLogout = () => {
		// Remove user info.

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
	} ;

	const deleteUser = () => {
		
		let stored = sessionStorage.getItem('GilderiseUser') ;

		let user = stored == null ? console.log("Failed") : JSON.parse(stored) ;

		let params = {
			'user_id': user.id,
			'access_token': accessToken,
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

	} ;

	const editUser = (firstName: string, lastName: string, dob: string, email: string, password: string) => {

		let stored = sessionStorage.getItem('GilderiseUser') ;

		let user = stored == null ? console.log("Failed") : JSON.parse(stored) ;

		let params = {
			'userid': user.id,
			'firstname': firstName,
			'lastname': lastName,
			'dob': dob,
			'email': email,
			'password': password,
			'access_token': accessToken,

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

					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		eUser() ;

	} ;
	
	const getUserInfo = () => {

		let userInfo = {} ;

		let stored = sessionStorage.getItem('GilderiseUser') ;

		let user = stored == null ? console.log("Failed") : JSON.parse(stored) ;

		let params = {
			'user_id': user.id,
			'access_token': accessToken,

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
						userInfo = data ;
						return userInfo ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		gUser() ;

	} ;

	const addProperty = (street: string, city: string, state: string, zipcode: number, description: string, estimate: number, photos: any, videos: any) => { 

		let stored = sessionStorage.getItem('GilderiseUser') ;

		let user = stored == null ? console.log("Failed") : JSON.parse(stored) ;

		let params = {
			'user_id': user.id,
			'street': street,
			'city': city,
			'state': state,
			'zipcode': zipcode,
			'description': description,
			'estimate': estimate,
			'photos': photos,
			'videos': videos,
			'access_token': accessToken,

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
				response.json().then(data => {
					if (data !== false) {
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		aProp() ;


	} ;

	const deleteProperty = (propertyId: number) => { 

		let params = {
			'property_id': propertyId,
			'access_token': accessToken,
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

					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		dProp() ;


	} ;

	const editProperty = (propertyId: number, street: string, city: string, state: string, zipcode: string, description: string, estimate: string, photos: any, videos: any) => { 


		let params = {
			'property_id': propertyId,
			'street': street,
			'city': city,
			'state': state,
			'zipcode': zipcode,
			'description': description,
			'estimate': estimate,
			'photos': photos,
			'videos': videos,
			'access_token': accessToken,

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
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		eProp() ;

	} ;

	const fetchProperties = () => { 
		
		let stored = sessionStorage.getItem('GilderiseUser') ;

		let user = stored == null ? console.log("Failed") : JSON.parse(stored) ;

		let properties = {} ;
		
		let params = {
			'user_id': user.id,
			'access_token': accessToken,
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
					console.log(data)
					if (data !== false) {
						properties = data ;
						return properties
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		getProps() ;

	} ;
	
	const refreshAccessToken = () => { 

		let stored = sessionStorage.getItem('GilderiseUser') ;

		let user = stored == null ? console.log("Failed") : JSON.parse(stored) ;
		
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
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		refreshAToken() ;


	} ;
	
	const authorizeUser = (email: string) => {

		let stored = sessionStorage.getItem('GilderiseUser') ;

		let user = stored == null ? console.log("Failed") : JSON.parse(stored) ;
		
		let params = {
			'user_id': user.id,
			'email_of_authorized' : email
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

					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		authorize() ;


	}
	
	const deauthorizeUser = (email: string) => {

		let stored = sessionStorage.getItem('GilderiseUser') ;

		let user = stored == null ? console.log("Failed") : JSON.parse(stored) ;
		
		let params = {
			'user_id': user.id,
			'email_of_authorized' : email
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
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		remove() ;


	}
	
	const test = () => {

		const test = async () => await fetch("/hello").then(response => {
			response.json().then(data => {
				console.log(data.string)
			})
		}).catch(e => {
			console.log(e)
		})

		test() ;
	} ;

	const testToken = (t: any) => {
		setToken(t) ;
	} ;
	

	return (
		<UserContext.Provider value={{
			user, userLogin, userRegistration, userLogout,
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