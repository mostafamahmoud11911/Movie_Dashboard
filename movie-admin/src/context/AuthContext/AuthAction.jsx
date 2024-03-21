// LOADING

export const Loginloading = () => ({
  type: "LOGIN_LOADING",
});

// SUCCESS
export const Loginsuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});


// Failure
export const LoginFailure = (error)=>({
    type: "LOGIN_FAILURE",
    payload: error
});



// Logout



export const Logout = ()=>({
  type: "LOGOUT",
});
