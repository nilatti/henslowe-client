import React, {useContext} from 'react'
import {
  Col,
  Container
} from 'react-bootstrap'

import Footer from './Footer'
import Main from './Main'
import Navigation from './Navigation'
import {getSuperAdminRole} from '../utils/authorizationUtils'
import {AppAuthContext} from './Contexts'

const user = JSON.parse(window.localStorage.getItem('user'))
const userRole = getSuperAdminRole(user)

export function MainApp () {
  return (
    <AppAuthContext.Provider value={userRole}>
      <Col xs={12}>
        <Navigation />
        <Main />
        <Footer />
      </Col>
    </AppAuthContext.Provider>
  )
}
