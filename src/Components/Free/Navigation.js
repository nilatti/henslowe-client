import LoginHooks from "../LoginHooks";

import { Nav, Navbar } from "react-bootstrap";

// The Header creates links that can be used to navigate
// between routes.
export default function Navigation() {
  return (
    <header>
      <Navbar>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/cut">Cut a play</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/">Make play wordclouds</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/">Make a doubling chart</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/">Generate part scripts</Nav.Link>
          </Nav.Item>
          <LoginHooks />
        </Nav>
      </Navbar>
    </header>
  );
}
