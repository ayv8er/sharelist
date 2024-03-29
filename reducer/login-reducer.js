export const ACTIONS = {
  SET_IS_LOGGING_IN: "SET_IS_LOGGING_IN",
  LOGIN_OR_SIGNUP: "LOGIN_OR_SIGNUP",
  SET_USERNAME_ERROR: "SET_USERNAME_ERROR",
  SET_PASSWORD_ERROR: "SET_PASSWORD_ERROR",
  SET_REPASSWORD_ERROR: "SET_REPASSWORD_ERROR",
  SET_BLANK_ERROR: "SET_BLANK_ERROR",
  SET_LOGIN_ERROR_MESSAGE: "SET_LOGIN_ERROR_MESSAGE",
};

export const loginReducer = (loginState, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOGGING_IN:
      return {
        ...loginState,
        isLoggingIn: action.payload,
      };
    case ACTIONS.LOGIN_OR_SIGNUP:
      return {
        ...loginState,
        loginErrorMessage: null,
        isPasswordsMatch: false,
        isPasswordShort: false,
        isUsernameShort: false,
        isSubmitBlank: false,
        isSignUp: action.payload,
      };
    case ACTIONS.SET_USERNAME_ERROR:
      return {
        ...loginState,
        loginErrorMessage: null,
        isUsernameShort: action.payload,
        isSubmitBlank: false,
      };
    case ACTIONS.SET_PASSWORD_ERROR:
      return {
        ...loginState,
        loginErrorMessage: null,
        isSubmitBlank: false,
        isPasswordShort: action.payload.isPasswordShort,
        isPasswordMatch: action.payload.isPasswordMatch,
      };
    case ACTIONS.SET_REPASSWORD_ERROR:
      return {
        ...loginState,
        loginErrorMessage: null,
        isSubmitBlank: false,
        isPasswordMatch: action.payload,
      };
    case ACTIONS.SET_BLANK_ERROR:
      return {
        ...loginState,
        loginErrorMessage: null,
        isSubmitBlank: action.payload,
        isLoggingIn: false,
      };
    case ACTIONS.SET_LOGIN_ERROR_MESSAGE:
      return {
        ...loginState,
        loginErrorMessage: action.payload,
        isLoggingIn: false,
      };
    default:
      throw new Error("How'd you end up here?!");
  }
};
