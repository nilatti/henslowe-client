import { useEffect, useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import LogoutHooks from "./LogoutHooks";
import { getTheaterNames } from "../api/theaters";
import { useMeState } from "../lib/meState";
import {
  getSuperAdminRole,
  theatersWhereUserIsAdmin,
} from "../utils/authorizationUtils";

export default function FullAccessNavigation() {
  const { me } = useMeState();
  const superAdmin = getSuperAdminRole(me);
  const [adminTheaters, setAdminTheaters] = useState([]);
  useEffect(async () => {
    let res = await getTheaterNames();
    if (res.status >= 400) {
      console.log("error getting theater names");
    } else {
      let tempAdminTheaters = await theatersWhereUserIsAdmin(me, res.data);
      setAdminTheaters(tempAdminTheaters);
    }
  }, []);

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
                </>
              )}
              {!!adminTheaters.length && (
                <Nav.Item>
                  <Nav.Link href="/institutional-account">
                    Your Institution's Account
                  </Nav.Link>
                </Nav.Item>
              )}
              <Nav.Item>
                <Nav.Link href="/account">Your Account</Nav.Link>
              </Nav.Item>
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
