import { useReducer, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import axios from "axios";
import { loginReducer, ACTIONS } from "../reducer/login-reducer";
import { Button } from "react-bootstrap";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loginState, dispatch] = useReducer(loginReducer, {
    loginErrorMessage: null,
    isPasswordsMatch: false,
    isPasswordShort: false,
    isUsernameShort: false,
    isSubmitBlank: false,
    isLoggingIn: false,
    isSignUp: false,
  });
  const router = useRouter();

  const nameChangeHandler = (e) => {
    if (loginState.isSignUp) {
      if (e.target.value === "" || e.target.value.trim().length > 2) {
        dispatch({
          type: ACTIONS.SET_USERNAME_ERROR,
          payload: false,
        });
        setUsername(e.target.value);
      } else if (e.target.value.trim().length < 3) {
        dispatch({
          type: ACTIONS.SET_USERNAME_ERROR,
          payload: true,
        });
        setUsername(e.target.value);
      }
    } else {
      dispatch({
        type: ACTIONS.SET_USERNAME_ERROR,
        payload: false,
      });
      setUsername(e.target.value);
    }
  };

  const passwordChangeHandler = (e) => {
    if (loginState.isSignUp) {
      if (e.target.value === "" || e.target.value.trim().length > 7) {
        if (e.target.value === rePassword) {
          dispatch({
            type: ACTIONS.SET_PASSWORD_ERROR,
            payload: {
              isPasswordShort: false,
              isPasswordMatch: false,
            },
          });
          setPassword(e.target.value);
        } else {
          dispatch({
            type: ACTIONS.SET_PASSWORD_ERROR,
            payload: {
              isPasswordShort: false,
              isPasswordMatch: true,
            },
          });
          setPassword(e.target.value);
        }
      } else {
        dispatch({
          type: ACTIONS.SET_PASSWORD_ERROR,
          payload: {
            isPasswordShort: true,
            isPasswordMatch: false,
          },
        });
        setPassword(e.target.value);
      }
    } else {
      dispatch({
        type: ACTIONS.SET_PASSWORD_ERROR,
        payload: {
          isPasswordShort: false,
          isPasswordMatch: false,
        },
      });
      setPassword(e.target.value);
    }
  };

  const rePasswordChangeHandler = (e) => {
    if (e.target.value === "" || e.target.value === password) {
      dispatch({
        type: ACTIONS.SET_REPASSWORD_ERROR,
        payload: false,
      });
      setRePassword(e.target.value);
    } else if (e.target.value !== password) {
      dispatch({
        type: ACTIONS.SET_REPASSWORD_ERROR,
        payload: true,
      });
      setRePassword(e.target.value);
    }
  };

  const createUser = async (username, password) => {
    const response = axios.post("/api/auth/users/signup", {
      username: username,
      password: password,
    });
    return response;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.SET_IS_LOGGING_IN, payload: true });
    if (loginState.isSignUp) {
      if (
        !username ||
        username.trim() === "" ||
        !password ||
        password.trim() === "" ||
        !rePassword ||
        rePassword.trim() === ""
      ) {
        dispatch({ type: ACTIONS.SET_BLANK_ERROR, payload: true });
        setUsername("");
        setPassword("");
        setRePassword("");
        return;
      } else {
        try {
          const result = await createUser(username, password);
          if (result.status === 201) {
            const result = await signIn("credentials", {
              redirect: false,
              username: username,
              password: password,
            });
            if (!result.error) {
              router.replace("/dashboard");
            } else {
              // handle error
            }
          }
        } catch (err) {
          console.log(err);
          // add error handling
        } finally {
          setUsername("");
          setPassword("");
          setRePassword("");
          dispatch({ type: ACTIONS.SET_IS_LOGGING_IN, payload: false });
        }
      }
    } else {
      if (
        !username ||
        username.trim() === "" ||
        !password ||
        password.trim() === ""
      ) {
        dispatch({ type: ACTIONS.SET_BLANK_ERROR, payload: true });
        setUsername("");
        setPassword("");
        return;
      } else {
        try {
          const result = await signIn("credentials", {
            redirect: false,
            username: username,
            password: password,
          });
          console.log(result);
          if (!result.error) {
            router.replace("/dashboard");
          } else {
            // handle error
            // loginState.loginErrorMessage
          }
        } catch (err) {
          console.log(err);
          // add error handling
        } finally {
          setUsername("");
          setPassword("");
          setRePassword("");
          dispatch({ type: ACTIONS.SET_IS_LOGGING_IN, payload: false });
        }
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-4">
        {loginState.isSignUp &&
          !loginState.loginErrorMessage &&
          !loginState.isUsernameShort &&
          !loginState.isSubmitBlank &&
          !loginState.isPasswordShort &&
          !loginState.isPasswordMatch && (
            <label htmlFor="basic-url" className="form-label text-light">
              Create Account
            </label>
          )}
        {!loginState.isSignUp &&
          !loginState.loginErrorMessage &&
          !loginState.isUsernameShort &&
          !loginState.isSubmitBlank && (
            <label htmlFor="basic-url" className="form-label text-light">
              Share-List
            </label>
          )}
        {loginState.isUsernameShort && (
          <label htmlFor="basic-url" className="form-label fs-6 text-danger">
            Username too short
          </label>
        )}
        {loginState.isPasswordShort && !loginState.isUsernameShort && (
          <label htmlFor="basic-url" className="form-label fs-6 text-danger">
            Password too short
          </label>
        )}
        {!loginState.isPasswordShort &&
          !loginState.isUsernameShort &&
          loginState.isPasswordMatch && (
            <label htmlFor="basic-url" className="form-label fs-6 text-danger">
              Passwords do not match
            </label>
          )}
        {loginState.isSubmitBlank && (
          <label htmlFor="basic-url" className="form-label fs-6 text-danger">
            Field is empty
          </label>
        )}
        {loginState.loginErrorMessage && (
          <label htmlFor="basic-url" className="form-label fs-6 text-danger">
            {loginState.loginErrorMessage}
          </label>
        )}
        <div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={nameChangeHandler}
              disabled={loginState.isLoggingIn}
              value={username}
            />
          </div>
          <div className="my-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={passwordChangeHandler}
              disabled={loginState.isLoggingIn}
              value={password}
            />
          </div>
          <div className="my-3">
            {loginState.isSignUp && (
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter Password"
                onChange={rePasswordChangeHandler}
                disabled={loginState.isLoggingIn}
                value={rePassword}
              />
            )}
          </div>
        </div>
      </div>
      <div className="d-grid">
        <Button
          className="text-white"
          onClick={submitHandler}
          variant="outline-secondary"
          type="submit"
          disabled={
            loginState.isLoggingIn ||
            loginState.isPasswordShort ||
            loginState.isPasswordMatch ||
            loginState.isUsernameShort
          }
        >
          {loginState.isSignUp ? "Sign Up" : "Login"}
        </Button>
      </div>
      <div className="d-flex justify-content-center text-white p-1 mt-5">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch({
              type: ACTIONS.LOGIN_OR_SIGNUP,
              payload: !loginState.isSignUp,
            });
            setUsername("");
            setPassword("");
            setRePassword("");
          }}
        >
          {loginState.isSignUp
            ? "I have an account"
            : "I don't have an account"}
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
