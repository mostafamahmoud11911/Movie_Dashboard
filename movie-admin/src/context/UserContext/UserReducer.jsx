const UserReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_USERS_SUCCESS":
      return {
        users: action.payload,
        loading: false,
        error: null,
      };

    case "GET_USERS_FAILURE":
      return {
        users: [],
        loading: false,
        error: action.payload,
      };
    case "CREATE_USER_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "CREATE_USER_SUCCESS":
      return {
        users: [...state.users, action.payload],
        loading: false,
        error: null,
      };
    case "CREATE_USER_FAILURE":
      return {
        users: [],
        loading: false,
        error: action.payload,
      };
    case "DELETE_USER_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "DELETE_USER_SUCCESS":
      return {
        users: state.users.filter((user) => user._id !== action.payload),
        loading: false,
        error: null,
      };
    case "DELETE_USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_USER_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "UPDATE_USER_SUCCESS":
      return {
        users: state.users.findIndex(
          (user) => user._id === action.payload._id && action.payload
        ),
        loading: false,
        error: null,
      };
    case "UPDATE_USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
