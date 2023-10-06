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
      
      <Navbar className=" pt-5 bg-dark pb-5" height="200">
        <Navbar.Item as={Link} href="/" className="text-light is-size-3 px-6" style={{textDecoration: 'none'}}>Home</Navbar.Item>
        {Auth.loggedIn() ? (
            <>

        <Navbar.Item as={Link} href="/savedRecipes" className="text-light is-size-5 px-6" style={{textDecoration: 'none'}}>My Saved Recipe Book</Navbar.Item>
        <Link className="btn btn-lg btn-info m-2" to="/me">
                Welcome {Auth.getProfile().data.username}
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
        </>
         ) : (
          <>
          <Navbar.Item as={Link}  href="/login" className="text-light px-6 mx-auto" style={{textDecoration: 'none'}}>Login</Navbar.Item>
         
          <Navbar.Item as={Link}  href="/signup" className="text-light px-6 mx-auto" style={{textDecoration: 'none'}}>Sign Up</Navbar.Item>
          </>
          )}
      </Navbar>
      
    </>
  );
};

export default AppNavbar;
