import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <Container className="h-100 min-vh-100 bg-dark" fluid>
      <div className="h-100 bg-dark container-sm d-flex flex-column align-items-center">
        {children}
      </div>
    </Container>
  );
};

export default Layout;
