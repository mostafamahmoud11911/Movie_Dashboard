const ListReducer = (state, action) => {
  switch (action.type) {
    case "GET_LISTS_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_LISTS_SUCCESS":
      return {
        lists: action.payload,
        loading: false,
        error: null,
      };
    case "GET_LISTS_FAILURE":
      return {
        lists: [],
        loading: false,
        error: action.payload,
      };
    case "CREATE_LISTS_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CREATE_LISTS_SUCCESS":
      return {
        lists: [...state, action.payload],
        loading: false,
        error: null,
      };
    case "CREATE_LISTS_FAILURE":
      return {
        lists: [],
        loading: false,
        error: action.payload,
      };
    case "DELETE_LIST_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_LIST_SUCCESS":
      return {
        lists: state.lists.filter((list) => list._id !== action.payload),
        loading: false,
        error: null,
      };
    case "DELETE_LIST_FAILURE":
      return {
        lists: [],
        loading: false,
        error: action.payload,
      };
    case "UPDATE_LIST_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_LIST_SUCCESS":
      return {
        lists: state.lists.findIndex(
          (list) => list._id === action.payload._id && action
        ),
        loading: false,
        error: null,
      };
    case "UPDATE_LIST_FAILURE":
      return {
        lists: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ListReducer;
