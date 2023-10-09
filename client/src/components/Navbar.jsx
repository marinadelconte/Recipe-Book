// import { useState } from "react";
import '../assets/style.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import {
  Navbar,
  Field,
  Control,
  Label,
  Button,
  Icon,
  Input,
} from "react-bulma-components";
// import SignUpForm from './SignupForm';
// import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  // const [showModal, setShowModal] = useState(false);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      
      <Navbar className=" pt-5 pb-5 navBar" height="200">
        <Navbar.Item as={Link} href="/" className="navLinks is-size-3 px-6" style={{textDecoration: 'none'}}>Home</Navbar.Item>
        {Auth.loggedIn() ? (
            <>

         <Navbar.Item as={Link} href="/savedRecipes" className="navLinks is-size-5 px-6" style={{textDecoration: 'none'}}> {Auth.getProfile().data.username}'s Saved Recipe's</Navbar.Item>
        
              <Navbar.Item className="logoutButton m-2" style={{textDecoration: 'none'}} onClick={logout}>
                Logout
              </Navbar.Item>
        </>
         ) : (
          <>
          
          <Navbar.Item as={Link}  href="/login" className="navLinks px-6 mx-auto" style={{textDecoration: 'none'}}>Login</Navbar.Item>
          <Navbar.Item as={Link}  href="/signup" className="navLinks px-6 mx-auto" style={{textDecoration: 'none'}}>Sign Up</Navbar.Item>
          </>
          )}
      </Navbar>
      
    </>
  );
};

export default AppNavbar;