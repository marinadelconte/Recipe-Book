import { useState, useEffect } from "react";
import "../assets/style.css";

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
      <Form.Field className="mx-5 mt-6">
        <Form.Label>Username</Form.Label>
        <Form.Control>
          <Form.Input
            placeholder="Username"
            name="username"
            type="username"
            value={userFormData.username}
            onChange={handleInputChange}
            required
          />
          <Icon align="left">
            <i className="github" />
          </Icon>
        </Form.Control>
      </Form.Field>

      <Form.Field className="mx-5">
        <Form.Label>Email</Form.Label>
        <Form.Control>
          <Form.Input
            placeholder="Email"
            name="email"
            type="email"
            value={userFormData.email}
            onChange={handleInputChange}
            required
          />
          <Icon align="left">
            <i className="github" />
          </Icon>
        </Form.Control>
      </Form.Field>

      <Form.Field className="mx-5">
        <Form.Label>Password</Form.Label>
        <Form.Control>
          <Form.Input
            placeholder="Password"
            name="password"
            type="password"
            value={userFormData.password}
            onChange={handleInputChange}
            required
          />
          <Icon align="left">
            <i className="github" />
          </Icon>
        </Form.Control>
      </Form.Field>

      <Button.Group className="mx-5 mt-6">
        <Button
          className="buttonSubmit"
          fullwidth
          rounded
          type="submit"
          onClick={handleFormSubmit}
          disabled={!(userFormData.email && userFormData.password && userFormData.username)}

        >
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
