import { Nav, Navbar, Container } from "react-bootstrap";
import LogoutHooks from "./LogoutHooks";
import { useMeState } from "../lib/meState";
import { getSuperAdminRole } from "../utils/authorizationUtils";

// The Header creates links that can be used to navigate
// between routes.
export default function Navigation() {
  const { me } = useMeState();

  const superAdmin = getSuperAdminRole(me);
  return (
    <header>
      <Navbar collapseOnSelect fixed="top" expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Container>
            <Nav className="customNav">
              <Nav.Item>
                <Nav.Link href="/" eventKey="1">
                  Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/productions" eventKey="2">
                  Productions
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/theaters" eventKey="3">
                  Theaters
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/spaces" eventKey="4">
                  Spaces
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/users" eventKey="5">
                  Users
                </Nav.Link>
              </Nav.Item>
              {superAdmin && (
                <>
                  <Nav.Item>
                    <Nav.Link href="/authors" eventKey="6">
                      Authors
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/plays" eventKey="7">
                      Plays
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/specializations" eventKey="8">
                      Specializations
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/jobs" eventKey="9">
                      Jobs
                    </Nav.Link>
                  </Nav.Item>
                </>
              )}
              <Nav.Item>
                Hi, {me?.name}
                <LogoutHooks />
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
