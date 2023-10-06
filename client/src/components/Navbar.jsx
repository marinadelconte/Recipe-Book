// import { useState } from "react";
import '../assets/style.css'
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
      
      <Navbar className="pt-5 pb-5 navBar" height="200">
        
        <Navbar.Item as={Link} href="/" className="is-size-3 px-6 navLinks" style={{textDecoration: 'none'}}>Home</Navbar.Item>

        <Navbar.Item as={Link} href="/savedRecipes" className="is-size-5 px-6 navLinks" style={{textDecoration: 'none'}}>My Saved Recipe Book</Navbar.Item>

        
          <Navbar.Item as={Link}  href="/login" className="px-6 mx-auto navLinks" style={{textDecoration: 'none'}}>Login</Navbar.Item>
          <Navbar.Item as={Link}  href="/signup" className="px-6 mx-auto navLinks" style={{textDecoration: 'none'}}>Sign Up</Navbar.Item>
        
      </Navbar>
      
    </>
  );
};

export default AppNavbar;