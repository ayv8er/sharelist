import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <Container className="vh-100 bg-dark" fluid>
      {children}
    </Container>
  );
};

export default Layout;
