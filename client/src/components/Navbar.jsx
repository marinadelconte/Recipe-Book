// import { useState } from "react";
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

// import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  // const [showModal, setShowModal] = useState(false);
   

  return (
    <>
      
      <Navbar.Item href="#" className=" pt-5 bg-dark pb-5" height="200">
        
        <Navbar.Item as={Link} href="/" className="text-light is-size-3 mx-5">Home</Navbar.Item>

        <Navbar.Item as={Link} href="/savedRecipes" className="text-light is-size-5 mx-5">My Saved Recipe Book</Navbar.Item>

        
          <Navbar.Item as={Link}  href="/login" className="text-light is-pulled-right mx-auto">Login</Navbar.Item>
          <Navbar.Item as={Link}  href="/signup" className="text-light is-pulled-right mx-auto">Sign Up</Navbar.Item>
        
      </Navbar.Item>
      
    </>
  );
};

export default AppNavbar;
