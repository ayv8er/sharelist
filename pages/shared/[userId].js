import Navbar from "../../components/NavBar";
import { Spinner } from "react-bootstrap";

const SharedDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center text-white min-vh-90 border">
        <Spinner animation="border" />
      </div>
    </>
  );
};

export default SharedDashboard;
