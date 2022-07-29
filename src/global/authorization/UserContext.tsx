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

		console.log("Handling User Login") ;
		let success = false ;

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
					console.log(data)
					if (data !== false) {
						success = true ;
						setUser({
							'authenticated': true,
							'id': data.user_id
						})
						setToken(data.access_token) ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		login() ;
		
		if (success) {
			navigate("/dashboard") ;
		} else {
			// warn user of unsuccessful registration attempt
			window.alert("Invalid Login")
		}
		
	} ;

	const userRegistration = (firstName: string, lastName: string, email: string, password: string) => {
		console.log("Handling User Registration") ;
		
		let success = false ;

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
					console.log(data) ;
					if (data !== false) {
						success = true ;
						setUser({
							'authenticated': true,
							'id': data.user_id,
						})
						setToken(data.access_token)
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		register() ;
		if (success) {
			navigate("/dashboard") ;
		} else {
			// warn user of unsuccessful registration attempt
		}
		
	} ;

	const userLogout = () => {
		console.log("Handling User Logout") ;
		// Remove user info.
		let success = false ;

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
						success = true ;
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
		
		if (success) { navigate("/") ; }
		else { console.log("Logout Op Failed") };
	} ;

	const deleteUser = () => {
		console.log("Handling Delete User") ;

		let success = false;
		
		let stored = sessionStorage.getItem('GilderiseUser');

		let user = stored == null ? console.log("Failed") : JSON.parse(stored);

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
					console.log(data)
					if (data !== false) {
						success = true ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		dUser() ;

		if (!success) {
			console.log("Delete User Op Failed") ;
		}

		userLogout() ;
	} ;

	const editUser = (firstName: string, lastName: string, dob: string, email: string, password: string) => {

		console.log("Handling Edit User") ;

		let success = false;
		
		let stored = sessionStorage.getItem('GilderiseUser');

		let user = stored == null ? console.log("Failed") : JSON.parse(stored);

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
					console.log(data)
					if (data !== false) {
						success = true ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		eUser() ;

		if (!success) {
			console.log("Edit User Op Failed") ;
		}

	} ;
	
	const getUserInfo = () => {
		console.log("Handling Get User Info");

		let success = false;

		let userInfo = {};

		let stored = sessionStorage.getItem('GilderiseUser');

		let user = stored == null ? console.log("Failed") : JSON.parse(stored);

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
					console.log(data)
					if (data !== false) {
						success = true ;
						userInfo = data ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		gUser() ;

		if (!success) {
			console.log("Get User Info Op Failed") ;
		} else {
			return userInfo ;
		}

	} ;

	const addProperty = (street: string, city: string, state: string, zipcode: number, description: string, estimate: number, photos: any, videos: any) => { 
		console.log("Handling Add Property") ;

		let success = false;
		let stored = sessionStorage.getItem('GilderiseUser');

		let user = stored == null ? console.log("Failed") : JSON.parse(stored);

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
					console.log(data)
					if (data !== false) {
						success = true ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		aProp() ;

		if (!success) {
			console.log("Add Property Op Failed") ;
		}

	} ;

	const deleteProperty = (propertyId: number) => { 
		console.log("Handling Delete Property") ;

		let success = false ;

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
					console.log(data)
					if (data !== false) {
						success = true ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		dProp() ;

		if (!success) {
			console.log("Delete Property Op Failed") ;
		}

	} ;

	const editProperty = (propertyId: number, street: string, city: string, state: string, zipcode: string, description: string, estimate: string, photos: any, videos: any) => { 
		console.log("Handling Edit Property") ;

		let success = false ;

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
					console.log(data)
					if (data !== false) {
						success = true ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		eProp() ;

		if (!success) {
			console.log("Edit Property Op Failed") ;
		}
	} ;

	const fetchProperties = () => { 
		console.log("Handling Add Property");
		
		let stored = sessionStorage.getItem('GilderiseUser');

		let user = stored == null ? console.log("Failed") : JSON.parse(stored);

		let properties = {} ;
		let success = false ;
		
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
						success = true ;
						properties = data ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		getProps() ;

		if (!success) {
			console.log("Add Property Op Failed") ;
		} else { return properties };
	} ;
	
	const refreshAccessToken = () => { 

		let success = false;

		let stored = sessionStorage.getItem('GilderiseUser');

		let user = stored == null ? console.log("Failed") : JSON.parse(stored);
		
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
					console.log(data)
					if (data !== false) {
						success = true ; 
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		refreshAToken();

		if (!success) {
			console.log("Access Token refresh failed") ;
		}
	};
	
	const authorizeUser = (email: string) => {
		let success = false;

		let stored = sessionStorage.getItem('GilderiseUser');

		let user = stored == null ? console.log("Failed") : JSON.parse(stored);
		
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
					console.log(data)
					if (data !== false) {
						success = true ; 
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		authorize();

		if (!success) {
			console.log("Authorize User Failed") ;
		}
		
	}
	
	const deauthorizeUser = (email: string) => {
		let success = false;

		let stored = sessionStorage.getItem('GilderiseUser');

		let user = stored == null ? console.log("Failed") : JSON.parse(stored);
		
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
					console.log(data)
					if (data !== false) {
						success = true ; 
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		remove();

		if (!success) {
			console.log("Deauthorize user Failed") ;
		}

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