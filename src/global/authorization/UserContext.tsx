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
		addPhotos:any,
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
	addProperty: (street: string, city: string, state: string, zipcode: number, description: string, estimate: number, formData:any) => { },
	deleteProperty: (propertyId: number) => { },
	editProperty: (propertyId: number, street: string, city: string, state: string, zipcode: string, description: string, estimate: string, formData:any) => { },
	fetchProperties: () => { },
	addPhotos: (formData:any) => { },
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
	let [user, setUser] = useState<User>(stored == null ?
		{
			authenticated: false,
			id: undefined,
		} :
		JSON.parse(stored)) ;

	useEffect(() => { 
		let stored = sessionStorage.getItem('GilderiseUser') ;
		setUser(stored == null ?
		{
			authenticated: false,
			id: undefined,
		} :
		JSON.parse(stored))
	}, [])
	// Store user data on local memory on every update of user or user.authenticated.
	useEffect(() => {
		sessionStorage.setItem('GilderiseUser', JSON.stringify(user)) ;

	}, [user, user.authenticated]) ;
	
	// refresh the access token every minute if applicable. time is in milliseconds.
	useEffect(() => {
		const interval = setInterval(() => { console.log(user.id); refreshAccessToken() }, (60000 *14)) ;
		return () => clearInterval(interval) ;
	  }, [ ]) ;

	const accessToken = () => {
		return getAccessToken();
	}
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
							setToken(data.access_token);
							

							navigate("/dashboard") ;
						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		login() ;
		
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
						if (data === 409) {
							console.log("edit user")
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

		eUser() ;

	} ;
	
	const getUserInfo = () => {

		let userInfo = {};
		
		refreshAccessToken();

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
						if (data === 409) {
							window.alert("Please Log In or Register") ;
							console.log('getUser')
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


		
	} ;

	const addProperty = (street: string, city: string, state: string, zipcode: number, description: string, estimate: number, formData:any) => { 
		refreshAccessToken();
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
						if (data === 409) {
						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		aProp();
		
		if (formData.photos != null) {
			addPhotos(formData);
		} if (formData.videos != null) {
			addVideos(formData);
		}

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
						if (data === 409) {

						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		dProp() ;


	} ;

	const editProperty = (propertyId: number, street: string, city: string, state: string, zipcode: string, description: string, estimate: string, formData:any) => { 

		refreshAccessToken();
		let params = {
			'property_id': propertyId,
			'street': street,
			'city': city,
			'state': state,
			'zipcode': zipcode,
			'description': description,
			'estimate': estimate,
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
						if (data === 409) {

						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		eProp();
		
		if (formData != null) {
			addPhotos(formData);
		}

	};
	
	const addPhotos = (formData) => {

		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: formData,
		}

		const addPhotos = async () => {
			await fetch("/add_photos", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 409) {

						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		addPhotos() ;

	}

	const addVideos = (formData) => {
		let requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: formData,
		}

		const addVideos = async () => {
			await fetch("/add_videos", requestOptions).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 409) {

						}
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		addVideos() ;


	}

	const fetchProperties = () => { 

		refreshAccessToken();
		
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
						if (data === 409) {

						} else {
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

	} ;
	
	const refreshAccessToken = () => { 
		console.log("running");

		let stored = sessionStorage.getItem('GilderiseUser');
		
		console.log(stored)

		let user = stored == null ? console.log("Failed") : JSON.parse(stored);
		console.log(user)

		console.log(user.id)
		
		

		const refreshAToken = async () => {
			await fetch("/refresh_access_token", {
				credentials: 'include',
				method: 'POST',
				mode: 'same-origin',
				cache: 'default',
			headers: {
				Accept: 'application/json',
    			'Content-Type': 'application/json'
			},
			body: JSON.stringify({'user_id': 4})}
					).then(response => {
				response.json().then(data => {
					if (data !== false) {
						if (data === 408) {

						}
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
						if (data === 409) {

						}

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
						if (data === 409) {

						}
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
			user, accessToken, userLogin, userRegistration, userLogout,
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