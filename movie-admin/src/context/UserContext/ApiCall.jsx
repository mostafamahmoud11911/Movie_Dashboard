import axios from "axios";
import {
  createUserFailure,
  createUserLoading,
  createUserSuccess,
  deleteUserFailure,
  deleteUserLoading,
  deleteUserSuccess,
  getUsersFailure,
  getUsersLoading,
  getUsersSuccess,
  updateUserFailure,
  updateUserLoading,
  updateUserSuccess,
} from "./UserAction";

// GET USERS
export const getUsers = async (dispatch) => {
  dispatch(getUsersLoading());
  try {
    const { data } = await axios.get(`https://api-cmuv.onrender.com/api/users`, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`,
      },
    });

    dispatch(getUsersSuccess(data));
    return data;
  } catch (error) {
    dispatch(getUsersFailure(error.response.data.message));
  }
};

// CREATE USER
export const createUser = async (user, dispatch) => {

  dispatch(createUserLoading());
  try {
    const { data } = await axios.post(`https://api-cmuv.onrender.com/api/auth/register`, user);
    dispatch(createUserSuccess(data));
  } catch (error) {
    dispatch(createUserFailure(error.response.data.message));
  }
};

// DELETE USER
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserLoading());
  try {
    await axios.delete(`https://api-cmuv.onrender.com/api/users/${id}`, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure(error.response.data.message));
  }
};

// UPDATE USER
export const updateUser = async (user, id, dispatch) => {
  dispatch(updateUserLoading());
  try {
    const { data } = await axios.put(
      `https://api-cmuv.onrender.com/api/users/${id}`,
      user,
      {
        headers: {
          token: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`,
        },
      }
    );
    dispatch(updateUserSuccess(data));
  } catch (error) {
    dispatch(updateUserFailure(error.response.data.message));
  }
};
