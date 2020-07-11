import React, {
  Component
} from 'react'
import {
  Nav,
  Navbar,
} from 'react-bootstrap'

import SignUpInOut from './SignUpInOut'
import {AppAuthContext} from './Contexts'


// The Header creates links that can be used to navigate
// between routes.
class Navigation extends Component {
  render() {
    return (
      <header>
        <Navbar>
          <Nav>
            <Nav.Item>
              <Nav.Link href="/">
                Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/productions">
                Productions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/theaters">
                Theaters
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/spaces">
                Spaces
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/users">
                Users
              </Nav.Link>
            </Nav.Item>
            <AppAuthContext.Consumer>
              {(value) => {
                if (value === 'superadmin'){
                  return (
                    <>
                    <Nav.Item>
                      <Nav.Link href="/authors">
                        Authors
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="/plays">
                        Plays
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="/specializations">
                        Specializations
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="/jobs">
                        Jobs
                      </Nav.Link>
                    </Nav.Item>
                    </>
                  )
                }
              }}
            </AppAuthContext.Consumer>
          </Nav>
        </Navbar>
      </header>
    )
  }
}

export default Navigation
