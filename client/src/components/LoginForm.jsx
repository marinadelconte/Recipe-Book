import { useState, useEffect } from "react";
import { Form, Button, Icon } from "react-bulma-components";

import '../assets/style.css'

import "bulma/css/bulma.min.css";
import { Link } from "react-router-dom";
// import { Form } from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);
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

    console.log(event.currentTarget);
    console.log(event.target);

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form.Field className="mx-5 mt-6">
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
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          fullwidth
          rounded
          onClick={handleFormSubmit}
        >
          Login
        </Button>
      </Button.Group>
    </>
  );
};

export default LoginForm;
