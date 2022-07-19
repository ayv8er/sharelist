import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <Container className="vh-100 bg-dark" fluid>
      <div className="vh-100 bg-dark container-sm">{children}</div>
    </Container>
  );
};

export default Layout;
