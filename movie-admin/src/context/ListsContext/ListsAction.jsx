// get lists loading
export const getListsLoading = () => ({
  type: "GET_LISTS_LOADING",
});

// get lists success
export const getListsSuccess = (lists) => ({
  type: "GET_LISTS_SUCCESS",
  payload: lists,
});

// get lists failure
export const getListsFailure = (error) => ({
  type: "GET_LISTS_FAILURE",
  payload: error,
});

// create list loading
export const createListLoading = () => ({
  type: "CREATE_LIST_LOADING",
});

// create list success
export const createListSuccess = (list) => ({
  type: "CREATE_LIST_SUCCESS",
  payload: list,
});

// create list failure
export const createListFailure = (error) => ({
  type: "CREATE_LIST_FAILURE",
  payload: error,
});

// delete list loading
export const deleteListLoading = () => ({
  type: "DELETE_LIST_LOADING",
});

// delete list success
export const deleteListSuccess = (id) => ({
  type: "DELETE_LIST_SUCCESS",
  payload: id,
});

// delete list failure
export const deleteListFailure = (error) => ({
  type: "DELETE_LIST_FAILURE",
});

// update list loading
export const updateListLoading = () => ({
  type: "UPDATE_LIST_LOADING",
});

// update list success
export const updateListSuccess = (list) => ({
  type: "UPDATE_LIST_SUCCESS",
  payload: list,
});

// update list failure
export const updateListFailure = (error) => ({
  type: "UPDATE_LIST_FAILURE",
  payload: error,
});
