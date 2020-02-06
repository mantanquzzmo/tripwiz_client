import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_LAT":
      return {
        ...state,
        lat: action.payload
      };
    case "CHANGE_LNG":
      return {
        ...state,
        lng: action.payload
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.payload
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload
      };
    case "CHANGE_AUTHMESSAGE":
      return {
        ...state,
        authMessage: action.payload
      };
    case "CHANGE_USER_ATTRIBUTES":
      return {
        ...state,
        userAttrs: action.payload
      };
    case "CHANGE_AUTHENTICATED":
      return {
        ...state,
        authenticated: action.payload
      };
    default:
      return {
        ...state
      };

  }
};

export default rootReducer;