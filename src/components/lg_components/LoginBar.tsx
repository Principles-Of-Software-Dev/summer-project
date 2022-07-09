import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import LogoName from '../sm_components/LogoName';
import MobileMenu from './MobileMenu';



const LoginBar = () => {

  // Database logic vars
  let validLogin = false;


  
  
  return (
    <div>

      {/* start actual code */}
      <nav className='h-navbar w-screen bg-zinc-200 grid grid-cols-2 grid-rows-1 fixed top-0 drop-shadow-lg '>
          
        {/* Logo and project name. */}
        < LogoName/>

        {/* Responsive hamburger menu and login buttons or login buttons by themselves. */}
        <section className='flex items-center justify-end'>
          
          {/* Hamburger menu only shows when screen size is small; otherwise display login/register buttons. */}
          <MobileMenu />
                
          {/* Login buttons show by themselves when screen is sufficiently big. */}
          <section className='hidden md:flex '>

            {/* Login Button and login logic*/}
            <LoginForm />
              
            {/* Register Button and registration logic*/}
            <RegisterForm />
                  
          </section>

        </section>

      </nav>
      {/* end code */}

    </div>

  )
}

export default LoginBar