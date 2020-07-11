import React, {
  Component,
  useContext
} from 'react'
import {AuthContext} from '../App.js'
import SignOut from './SignOut'
import SignIn from './SignIn'
import {buildUserName} from '../utils/actorUtils'
export default function SignUpInOut() {
const authContext = React.useContext(AuthContext);
return (
  <div>
  {
    !authContext.state.isAuthenticated ?
    <SignIn isAuthenticated={authContext.state.isAuthenticated}/>
    :
  <div>
    Welcome, {buildUserName(JSON.parse(window.localStorage.getItem('user')))}!
    <SignOut />
    </div>
  }
  </div>
)
}
