import { createContext, useState, useContext, useEffect } from "react" ;
import { Role, User } from "../TypeDefs" ;
import { useNavigate } from "react-router-dom" ;
import { json } from "stream/consumers" ;


export const initializeUser:
	{
		user: User, setUser: any, userLogin: any, userRegistration: any, userLogout: any,
		deleteUser: any, editUser: any, getUser: any, addProperty: any, deleteProperty: any,
		editProperty:any,
	} =
{
	user: {
		authenticated: false,
		id: undefined,
		role: Role.Unassigned
	},
	setUser: (user: User) => { },
	userLogin: (email: string, password: string) => { },
	userRegistration: (firstName: string, lastName: string, dob: string, email: string, password: string) => { },
	userLogout: () => { },
	deleteUser: (userId: number) => { },
	editUser: (userId: number, firstName: string, lastName: string, dob: string, email: string, password: string) => { },
	getUser: (userId: number) => { },
	addProperty: (userId: number, street: string, city: string, state: string, zipcode: string, description: string, estimate: string, photos: any, videos: any) => { },
	deleteProperty: (propertyId: number) => { },
	editProperty: (propertyId: number, street: string, city: string, state: string, zipcode: string, description: string, estimate: string, photos: any, videos: any) => { },


	
}

export const UserContext = createContext<any>(initializeUser) ;

export const UserProvider = ({ children }) => {

	const navigate = useNavigate() ;
	const stored = window.localStorage.getItem('GilderiseUser') ;
	const [user, setUser] = useState<User>( stored == null ?
		{
			authenticated: false,
			id: undefined,
			role: Role.Unassigned
		} :
		JSON.parse(stored)) ;

	// @todo update to use JWT Token
	// Store user data on local memory on every update of user or user.authenticated.
	useEffect(() => {
		window.localStorage.setItem('GilderiseUser', JSON.stringify(user)) ;

	}, [user, user.authenticated])

	const userLogin = (email: string, password: string) => {

		console.log("Handling User Login") ;

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
					// fix condition later
					if (data === false){
						// warn user of unsuccessful registration attempt
					} else {
						// redirect on successful registration
						navigate("dashboard") ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		login() ;
	}

	const userRegistration = (firstName: string, lastName: string, dob: string, email: string, password: string) => {
		console.log("Handling User Registration") ;

		const params = {
			'first_name': firstName,
			'last_name': lastName,
			'dob' : dob,
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
					console.log(data)
					// fix condition later
					if (data === false){
						// warn user of unsuccessful registration attempt
					} else {
						// redirect on successful registration
						navigate("dashboard") ;
					}
				})
			}).catch(e => {
				console.log(e)
			})
		}

		register() ;
		
	}

	const userLogout = () => {
		// Remove user info.
		setUser({
			authenticated: false,
			id: undefined,
			role: Role.Unassigned,
		}) ;
		navigate("/") ;
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
	}

	

  
	return (
		<UserContext.Provider value={{ user, userLogin, userRegistration, userLogout,test }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => useContext(UserContext) ;

export default UserContext ;