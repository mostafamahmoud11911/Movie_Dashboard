import axios from "axios";
import { LoginFailure, Loginloading, Loginsuccess } from "./AuthAction";

export const loginUser = async (user, dispatch) => {
  dispatch(Loginloading());
  try {
    const { data } = await axios.post(
      `https://api-cmuv.onrender.com/api/auth/login`,
      user
    );

    if (data.isAdmin) {
      dispatch(Loginsuccess(data));
      return data.isAdmin
    } else {
      dispatch(LoginFailure("User is not allow to sign in"));
    }
  } catch (error) {
    dispatch(LoginFailure(error.response.data.message));
  }
};


