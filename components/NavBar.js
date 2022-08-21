import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  const router = useRouter();

  return (
    <Navbar className="w-75" bg="dark" variant="dark">
      <Navbar.Brand>Share-List</Navbar.Brand>
      <Nav className="d-flex justify-content-end align-items-center w-100">
        <Nav.Link
          className="text-white text-decoration-none"
          onClick={() => signOut()}
        >
          Log Out
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
