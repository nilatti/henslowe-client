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
            <Nav.Link href="/wordcloud">Make play wordclouds</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/doubling">Make a doubling chart</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/part-scripts">Generate part scripts</Nav.Link>
          </Nav.Item>
          <LoginHooks />
        </Nav>
      </Navbar>
    </header>
  );
}
