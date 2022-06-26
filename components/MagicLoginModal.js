import { useState } from "react";
import { useRouter } from "next/router";

import { useMagicContext } from "../store/magic-context";
import { useUserContext } from "../store/user-context";

import { Button } from "react-bootstrap";

const MagicLoginModal = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [inputOneError, setInputOneError] = useState(false);
  const [inputCharError, setInputCharError] = useState(false);
  const { setUserMetadata } = useUserContext();
  const magic = useMagicContext();
  const router = useRouter();

  const phoneNumberChangeHandler = (e) => {
    e.preventDefault();
    if (
      e.target.value.match(/^[0-9]+$/) === null &&
      e.target.value.substring(0, 1) === "1"
    ) {
      setInputOneError(true);
      setInputCharError(true);
    } else if (e.target.value === "") {
      setInputOneError(false);
      setInputCharError(false);
    } else if (e.target.value.match(/^[0-9]+$/) === null) {
      setInputOneError(false);
      setInputCharError(true);
    } else if (e.target.value.substring(0, 1) === "1") {
      setInputCharError(false);
      setInputOneError(true);
    } else {
      setInputOneError(false);
      setInputCharError(false);
    }
    setPhoneNumber(e.target.value);
  };

  const loginHandler = async () => {
    setIsLoggingIn(true);
    const phone = phoneNumber.trim();
    try {
      const didToken = await magic.auth.loginWithSMS({
        phoneNumber: `+1${phone}`,
      });
      if (didToken) {
        magic.user.getMetadata().then((userData) => {
          setUserMetadata(userData);
          router.push("/dashboard");
        });
      } else {
        setLoginError(true);
      }
      setIsLoggingIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <div className="mb-4">
        <label htmlFor="basic-url" className="form-label text-light">
          Login with Phone Number
        </label>
        <div className="input-group mb-1">
          <span className="input-group-text" id="basic-addon1">
            +1
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="### - ### - ####"
            aria-label="PhoneNumber"
            aria-describedby="phoneNumberInput"
            onChange={phoneNumberChangeHandler}
            disabled={isLoggingIn}
            value={phoneNumber}
          />
        </div>
        {loginError && (
          <div className="fs-6 text-danger" id="phoneNumberInput">
            Login was unsuccessful
          </div>
        )}
        {inputOneError && (
          <div className="fs-6 text-danger" id="phoneNumberInput">
            Cannot start with 1
          </div>
        )}
        {inputCharError && (
          <div className="fs-6 text-danger" id="phoneNumberInput">
            No letters or special characters
          </div>
        )}
      </div>
      <div className="d-grid">
        <Button
          className="text-white"
          onClick={loginHandler}
          variant="outline-secondary"
          type="submit"
          disabled={isLoggingIn || inputOneError || inputCharError}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default MagicLoginModal;
