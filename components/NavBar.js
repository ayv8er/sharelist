import { useMagicContext } from "../store/magic-context";
import { useUserContext } from "../store/user-context";

import { Nav, Navbar, Container } from "react-bootstrap";

const NavBar = () => {
  const { userMetadata, setUserMetadata } = useUserContext();
  const magic = useMagicContext();

  const logoutHandler = () => {
    magic.user.logout().then(() => {
      setUserMetadata(null);
    });
  };

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Share List</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link disabled href="/">
              My Lists
            </Nav.Link>
            <Nav.Link disabled href="/404">
              Invited Lists
            </Nav.Link>
            <Nav.Link onClick={logoutHandler}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
