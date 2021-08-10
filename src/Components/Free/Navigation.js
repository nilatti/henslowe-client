// import LoginHooks from "../LoginHooks";
import styled from "styled-components";
import { Nav, Navbar, Container } from "react-bootstrap";
import PaypalButton from "../PaypalButton";

// The Header creates links that can be used to navigate
// between routes.
export default function Navigation() {
  return (
    <header>
      <Navbar collapseOnSelect fixed="top" expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Container>
            <Nav className="customNav">
              <Nav.Item>
                <Nav.Link href="/casting">Cast your play</Nav.Link>
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
              {/* <LoginHooks /> */}
              <PaypalButton />
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
