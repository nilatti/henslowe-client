import { Nav, Navbar } from "react-bootstrap";
// import LogoutHooks from "./LogoutHooks";
import { useMeState } from "../lib/meState";
import { getSuperAdminRole } from "../utils/authorizationUtils";

// The Header creates links that can be used to navigate
// between routes.
export default function Navigation() {
  const { me } = useMeState();
  const superAdmin = getSuperAdminRole(me);
  return (
    <header>
      <Navbar>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/">Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/productions">Productions</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/theaters">Theaters</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/spaces">Spaces</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/users">Users</Nav.Link>
          </Nav.Item>
          {superAdmin && (
            <>
              <Nav.Item>
                <Nav.Link href="/authors">Authors</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/plays">Plays</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/specializations">Specializations</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/jobs">Jobs</Nav.Link>
              </Nav.Item>
            </>
          )}
          {/* <Nav.Item>
            Hi, {me?.first_name}
            <LogoutHooks />
          </Nav.Item> */}
        </Nav>
      </Navbar>
    </header>
  );
}
