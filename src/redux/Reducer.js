import { GET_ALL_USERS, DELETE_USER, CHANGE_PASSWORD } from "./Actions";

const initialState = {
  allUsers: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_USERS:
        return {
          ...state,
          allUsers: action.payload,
        };
        case DELETE_USER:
        return {
          ...state,
        };
        case CHANGE_PASSWORD:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
