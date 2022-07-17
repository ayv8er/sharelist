import { useMagicContext } from "../store/magic-context";
import { useAuthContext } from "../store/auth-context";
import { Nav, Navbar, Container } from "react-bootstrap";

const NavBar = () => {
  const { userMetadata, setUserMetadata } = useAuthContext();
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
            <Nav.Link href={`/${userMetadata.phoneNumber}`}>My Lists</Nav.Link>
            <Nav.Link href={`/shared/${userMetadata.phoneNumber}`}>
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
