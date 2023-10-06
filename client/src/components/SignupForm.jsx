import { useState, useEffect } from "react";
// import { Form, Button, Alert } from 'react-bootstrap';

import "bulma/css/bulma.min.css";
import { Form, Icon, Input, Button } from "react-bulma-components";

import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [createUser, { error }] = useMutation(ADD_USER);
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
   

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
           
      <Form.Field>
        <Form.Label>Username</Form.Label>
        <Form.Control>
          <Form.Input
            placeholder="Username"
            name="username"
            type="username"
            value={userFormData.username}
             onChange={handleInputChange}
          />
          <Icon align="left">
            <i className="github" />
          </Icon>
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Email</Form.Label>
        <Form.Control>
          <Form.Input
            placeholder="Email"
            name="email"
            type="email"
            value={userFormData.email}
            onChange={handleInputChange}
            />
          <Icon align="left">
            <i className="github" />
          </Icon>
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Password</Form.Label>
        <Form.Control>
          <Form.Input
            placeholder="Password"
            name="password"
            type="password"
            value={userFormData.password}
            onChange={handleInputChange}
            />
          <Icon align="left">
            <i className="github" />
          </Icon>
        </Form.Control>
      </Form.Field>

      <Button.Group>
        <Button fullwidth rounded color="primary" type="submit" onClick={handleFormSubmit}>
          Sign Up
        </Button>
      </Button.Group>
      

    </>
  );
};
//     </>
//   );
// };

export default SignupForm;
