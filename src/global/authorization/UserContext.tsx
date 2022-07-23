import { createContext, useState, useContext, useEffect } from "react" ;
import { Role, User } from "../TypeDefs" ;
import { useNavigate } from "react-router-dom" ;




export const initializeUser:
  { user:User, setUser:any, userLogin:any, userRegistration:any, userLogout:any,} =
{
	user : {
		authenticated: false,
		id: undefined,
		role: Role.Unassigned
	},
	setUser: (user: User) => { },
	userLogin: (email: string, password: string) => { },
	userRegistration: (email: string, name: string, password: string, phone: string) => { },
	userLogout: (op: string) => { },
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

	// // Get stored user info from local memory on app load.
	// useEffect(() => {
	//   const stored = window.localStorage.getItem('GilderiseUser')
	//   if (stored !=null) {
	//     setUser(JSON.parse(stored));
	//   }
	// }, [])

	// Store user data on local memory on every update of user or user.authenticated.
	useEffect(() => {
		window.localStorage.setItem('GilderiseUser', JSON.stringify(user)) ;

	}, [user, user.authenticated])

	const userLogin = (email: string, password: string) => {
		console.log("Handling User Login") ;
		// @todo add database functionality
		setUser({
			authenticated: true,
			id: 1,
			role: Role.Admin,
		}) ;
		navigate("dashboard") ;
	}

	const userRegistration = (email: string, name: string, password: string, phone: string) => {
		console.log("Handling User Registration") ;
		// @todo add database functionality
		setUser({
			authenticated: true,
			id: 1,
			role: Role.Admin,
		}) ;
		navigate("dashboard") ;
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

		fetch("/hello").then(response => {
			response.json().then(data => {
				console.log(data.string)
			})
		}).catch(e => {
			console.log(e)
		})
	}

  
	return (
		<UserContext.Provider value={{ user, userLogin, userRegistration, userLogout,test }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => useContext(UserContext) ;

export default UserContext ;