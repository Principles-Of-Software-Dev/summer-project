import { createContext, useState, useContext, useEffect, useMemo} from "react";
import { Role, User } from "../TypeDefs";
import Button from "../../components/sm_components/Button";
import LogoutConfirmation from "../../components/lg_components/LogoutConfirmation";



export const initializeUser:
  { user:User, setUser:any, userLogin:any, userRegistration:any, userLogout:any, } =
{
  user : {
    authenticated: false,
    id: undefined,
    role: Role.Unassigned
  },
  setUser: (user: User) => { },
  userLogin: (email: string, password: string) => { },
  userRegistration: (email: string, name: string, password: string, phone: string) => { },
  userLogout: (op: string) => {  },

}

export const UserContext = createContext<any>(initializeUser);

export const UserProvider = ({ children }) => {

  const stored = window.localStorage.getItem('GilderiseUser');
  const [user, setUser] = useState<User>( stored == null ?
    {
    authenticated: false,
    id: undefined,
    role: Role.Unassigned
    } :
  JSON.parse(stored));

  // // Get stored user info from local memory on app load.
  // useEffect(() => {
  //   const stored = window.localStorage.getItem('GilderiseUser')
  //   if (stored !=null) {
  //     setUser(JSON.parse(stored));
  //   }
  // }, [])

  // Store user data on local memory on every update of user or user.authenticated.
  useEffect(() => {
    window.localStorage.setItem('GilderiseUser', JSON.stringify(user));

  }, [user, user.authenticated])

  const userLogin = (email: string, password: string) =>{
    console.log("Handling User Login");
    // @todo add database functionality
    setUser({
      authenticated: true,
      id: 1,
      role: Role.Admin,
    })
  }

  const userRegistration = (email: string, name: string, password: string, phone: string) => {
    console.log("Handling User Registration");
    // @todo add database functionality
    setUser({
      authenticated: true,
      id: 1,
      role: Role.Admin,
    })
  }

  const userLogout = () => {
        // Remove user info.
        setUser({
          authenticated: false,
          id: undefined,
          role: Role.Unassigned,
        });
  }

  
  return (
    <UserContext.Provider value={{ user, userLogin, userRegistration, userLogout}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);

export default UserContext;