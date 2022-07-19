import Link from "next/link";
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
        <Navbar.Brand>Share-List</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="d-flex justify-content-evenly align-items-center w-50">
            <Link href="[userId]" as={`${userMetadata.phoneNumber}`}>
              <a className="text-white text-decoration-none">My Lists</a>
            </Link>
            {/* <Link
              href="shared/[userId]"
              as={`shared/${userMetadata.phoneNumber}`}
            >
              <a className="text-white text-decoration-none">Shared Lists</a>
            </Link> */}
            <Nav.Link onClick={logoutHandler}>
              <a className="text-white text-decoration-none">Log Out</a>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
