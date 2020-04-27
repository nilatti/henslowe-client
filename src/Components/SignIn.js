import React, {
  useContext,
  useState,
} from 'react'
import {
  Button,
  Col,
  Form
} from 'react-bootstrap'

import { useHistory } from 'react-router-dom'

import {loginUser} from '../api/users'
import { AuthContext } from "../App";


export const SignIn = ({isAuthenticated, onFormClose}) => {
  const { dispatch } = useContext(AuthContext);
  let history = useHistory()
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  function handleSubmit (event) {
    event.preventDefault()
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })
    let userObj = {
      email: data.email,
      password: data.password
    }
    signIn(userObj).then(resJson => {
      dispatch({
        type: "LOGIN",
        payload: resJson
      })
    })
    .catch(error => {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
      })
    })
  }

  async function signIn(userObj) {
    const response = await loginUser(userObj)
    if (response.status >= 400) {
      throw Error("login failed")
    }
    return response
  }
  const [data, setData] = React.useState(initialState);
  const [validated, setValidated] = React.useState(false)
  const handleInputChange = event => {
      setData({
        ...data,
        [event.target.name]: event.target.value
      });
    };

  return(
    <Col md={ {
        span: 8,
        offset: 2
      } }>
      <h1>Sign in</h1>
      {isAuthenticated}
      <Form
        noValidate
        onSubmit={handleSubmit}
        validated={validated}
      >
        <Form.Group controlId="email">
          <Form.Label>
            Email
          </Form.Label>
          <Form.Control
              name="email"
              onChange={handleInputChange}
              placeholder="email"
              required
              type="email"
              value={data.email}
            />
            <Form.Control.Feedback type="invalid">
              Email is required
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>
            Password
          </Form.Label>
            <Form.Control
              name="password"
              onChange={handleInputChange}
              placeholder="password"
              type="password"
              value={data.password}
            />
        </Form.Group>
        <Button type="submit" variant="primary" block>Submit</Button>
        <Button type="button" onClick={() => history.goBack()} block>Cancel</Button>
        {data.errorMessage && (
              <p className="form-error">{data.errorMessage}</p>
            )}

            <Button disabled={data.isSubmitting}>
              {data.isSubmitting ? (
                "Loading..."
              ) : (
                "Login"
              )}
            </Button>
      </Form>
    </Col>
  )
}

export default SignIn
