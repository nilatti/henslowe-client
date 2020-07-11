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


export const SignOut = () => {
  const { dispatch } = useContext(AuthContext);
  let history = useHistory()
  function handleLogout() {
    dispatch({
      type: "LOGOUT"
    })
  }

  return(
    <Button onClick={handleLogout}>Sign Out</Button>
  )
}

export default SignOut
