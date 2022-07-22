import LoginForm from './forms/LoginForm' ;
import RegisterForm from './forms/RegisterForm' ;
import MobileMenu from './MobileMenu' ;
import { useState } from 'react' ;
import TopBar from './TopBar' ;



const LoginBar = () => {
	// Display/hide register and login forms
	const [register, setRegister] = useState(false) ;
	const handleClickRegister = () => {

		if (login) {
			setLogin(!login) ;
		}
		setRegister(!register) ;
	}

	const [login, setLogin] = useState(false) ;

	const handleClickLogin = () => {
		if (register) {
			setRegister(!register) ;
		}
		setLogin(!login) ;
	}


  
	return (
		<div>

			<TopBar >
				{/* Responsive hamburger menu and login buttons or login buttons by themselves. */}
				<section className='flex items-center justify-end'>
          
					{/* Hamburger menu only shows when screen size is small; otherwise display login/register buttons. */}
					<MobileMenu/>
                
					{/* Login buttons show by themselves when screen is sufficiently big. */}
					<section className='hidden md:flex '>

						{/* Login Button and login logic*/}
						<LoginForm handleClickLogin={handleClickLogin} login={login}/>
              
						{/* Register Button and registration logic*/}
						<RegisterForm handleClickRegister={handleClickRegister} register={register}/>
                  
					</section>

				</section>
			</TopBar>
			{/* end code */}

		</div>

	)
}

export default LoginBar