// LOADING
export const getUsersLoading = () => ({
  type: "GET_USERS_LOADING",
});

// success get data

export const getUsersSuccess = (users) => ({
  type: "GET_USERS_SUCCESS",
  payload: users,
});

// failure get data

export const getUsersFailure = (error) => ({
  type: "GET_USERS_FAILURE",
  payload: error,
});

// create new user

// create user loading
export const createUserLoading = () => ({
  type: "CREATE_USER_LOADING",
});

// create user success
export const createUserSuccess = (user) => ({
  type: "CREATE_USER_SUCCESS",
  payload: user,
});

// create user failure
export const createUserFailure = (error) => ({
  type: "CREATE_USER_FAILURE",
  payload: error,
});

// delete user

// delete user loading

export const deleteUserLoading = () => ({
  type: "DELETE_USER_LOADING",
});

// delete user success

export const deleteUserSuccess = (id) => ({
  type: "DELETE_USER_SUCCESS",
  payload: id,
});

// delete user failure

export const deleteUserFailure = (error) => ({
  type: "DELETE_USER_FAILURE",
  payload: error,
});



// update


// update user loading

export const updateUserLoading = ()=>({
  type: "UPDATE_USER_LOADING"
});

// update user success

export const updateUserSuccess = (user)=>({
  type: "UPDATE_USER_SUCCESS",
  payload: user
});

// update user failure
export const updateUserFailure = (error)=>({
  type: "UPDATE_USER_FAILURE",
  payloaad: error
})
