import { useEffect } from "react";
import { useRouter } from "next/router";
import MagicLoginModal from "../components/MagicLoginModal";
import { useAuthContext } from "../store/auth-context";
import { Spinner } from "react-bootstrap";

const Root = () => {
  const { userMetadata } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (userMetadata) {
      router.push(`/${userMetadata.phoneNumber}`);
    }
  });

  if (userMetadata) {
    return (
      <div className="d-flex justify-content-center align-items-center text-white min-vh-100">
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <MagicLoginModal />
    </div>
  );
};

export default Root;
