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
    case "SET_DEST":
      return {
        ...state,
        destination: action.payload
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
    case "CHANGE_LOGINBUTTON":
      return {
        ...state,
        displayLoginButton: action.payload
      };
    case "SET_DAYS":
      return {
        ...state,
        days: action.payload
      };
    case "SET_TRIP":
      return {
        ...state,
        trip: action.payload
      };
    case "GOT_ACTIVITIES":
      return {
        ...state,
        gotActivities: action.payload
      };
    case "SET_GOTHOTELS":
      return {
        ...state,
        gotHotels: action.payload
      };
    case "GOT_RESTAURANTS":
      return {
        ...state,
        gotRestaurants: action.payload
      };
    case "SET_FINALIZEMESSAGE":
      return {
        ...state,
        gotRestaurants: action.payload
      };
    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload
      };
    case "SET_HOTELS":
      return {
        ...state,
        hotels: action.payload
      };
    case "GOT_ACTIVITYTYPE":
      return {
        ...state,
        activityType: action.payload
      };
    case "UPDATE_PROGRESSION":
      return {
        ...state,
        progression: action.payload
      };
    case "SET_SELECTEDCARD":
      return {
        ...state,
        selectedCard: action.payload
      };
    case "SET_TRIPS":
      return {
        ...state,
        trips: action.payload
      };
    case "SET_RESTAURANTS":
      return {
        ...state,
        restaurants: action.payload
      };
    case "SET_CURRENTUSER":
      return {
        ...state,
        currentUser: action.payload
      };
    case "SET_CURRENTROUTE":
      return {
        ...state,
        currentRoute: action.payload
      };
    case "SET_LOGOUT":
      return {
        ...state,
        logout: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;