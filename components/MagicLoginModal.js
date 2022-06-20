import React, { useState } from "react";
import { magic } from "../magic";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

const MagicLoginModal = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputError, setInputError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const phoneNumberChangeHandler = (e) => {
    e.preventDefault();
    if (
      e.target.value.match(/^[0-9]+$/) === null ||
      e.target.value.substring(0, 1) === "1"
    ) {
      setInputError(true);
    } else {
      setInputError(false);
    }
    setPhoneNumber(e.target.value);
  };

  const loginHandler = async () => {
    setIsLoggingIn(true);
    const phone = phoneNumber.trim();
    try {
      await magic.auth.loginWithSMS({
        phoneNumber: `+1${phone}`,
      });
      router.push("/404");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="basic-url" className="form-label">
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
        {inputError && (
          <div style={{ color: "red" }} id="phoneNumberInput">
            First digit cannot be 1, no letters or special characters
          </div>
        )}
      </div>
      <Button
        onClick={loginHandler}
        variant="primary"
        type="submit"
        disabled={isLoggingIn || inputError}
      >
        Submit
      </Button>
    </form>
  );
};

export default MagicLoginModal;
