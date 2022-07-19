import Navbar from "../../components/NavBar";
import { useAuthContext } from "../../store/auth-context";
import { Spinner } from "react-bootstrap";

const SharedDashboard = () => {
  const { userMetadata } = useAuthContext();

  if (!userMetadata) {
    return (
      <div className="d-flex justify-content-center align-items-center text-white vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center mh-100">
        <Spinner className="text-white" animation="border" />
      </div>
    </>
  );
};

export default SharedDashboard;
