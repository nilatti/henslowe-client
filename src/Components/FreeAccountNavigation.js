import { Nav, Navbar, Container } from "react-bootstrap";
import LogoutHooks from "./LogoutHooks";
import { useMeState } from "../lib/meState";

import PaypalButton from "./PaypalButton";

export default function FullAccessNavigation() {
  const { me } = useMeState();

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
                <Nav.Link href="/casting">Cast a play</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/cut">Cut a play</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/wordcloud">Make play wordclouds</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/doubling">Make a doubling chart</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/part-scripts">Generate part scripts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/account">Your Account</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <LogoutHooks />
              </Nav.Item>
              <PaypalButton />
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
