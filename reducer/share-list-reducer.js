export const ACTIONS = {
  SET_SHARING_ERROR_MESSAGE: "SET_SHARING_ERROR_MESSAGE",
  SET_USERNAME_ERROR: "SET_USERNAME_ERROR",
  SET_BLANK_ERROR: "SET_BLANK_ERROR",
  SET_IS_SHARING: "SET_IS_SHARING",
};

export const shareListReducer = (sharingState, action) => {
  switch (action.type) {
    case ACTIONS.SET_SHARING_ERROR_MESSAGE:
      return {
        ...sharingState,
        sharingErrorMessage: action.payload,
        isSharing: false,
      };
    case ACTIONS.SET_USERNAME_ERROR:
      return {
        ...sharingState,
        isUsernameShort: action.payload,
        isSubmitBlank: false,
      };
    case ACTIONS.SET_BLANK_ERROR:
      return {
        ...sharingState,
        isSubmitBlank: action.payload,
        isSharing: false,
      };
    case ACTIONS.SET_IS_SHARING:
      return {
        ...sharingState,
        isSharing: action.payload,
      };
    default:
      throw new Error("How'd you end up here?!");
  }
};
