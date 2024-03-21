import axios from "axios";
import {
  createListFailure,
  createListLoading,
  createListSuccess,
  deleteListFailure,
  deleteListLoading,
  deleteListSuccess,
  getListsFailure,
  getListsLoading,
  getListsSuccess,
  updateListFailure,
  updateListLoading,
  updateListSuccess,
} from "./ListsAction";

// GET LISTS
export const getLists = async (dispatch) => {
  dispatch(getListsLoading());
  try {
    const { data } = await axios.get(`http://localhost:5000/api/lists`, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`,
      },
    });
    dispatch(getListsSuccess(data));
  } catch (error) {
    dispatch(getListsFailure(error.response.data.message));
  }
};

// DELETE LIST
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListLoading());
  try {
    await axios.delete(`http://localhost:5000/api/lists/${id}`, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (error) {
    dispatch(deleteListFailure(error.response.data.message));
  }
};

// CREARE LIST
export const createList = async (list, dispatch) => {
  dispatch(createListLoading());
  try {
    const { data } = await axios.post(`http://localhost:5000/api/lists`, list, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`,
      },
    });

    dispatch(createListSuccess(data));
    return data;
  } catch (error) {
    dispatch(createListFailure(error.response.data.message));
  }
};

// UPDATE LIST
export const updateList = async (list, id, dispatch) => {
  dispatch(updateListLoading());
  try {
    const { data } = await axios.put(
      `http://localhost:5000/api/lists/${id}`,
      list,
      {
        headers: {
          token: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`,
        },
      }
    );

    dispatch(updateListSuccess(data));
    return data;
  } catch (error) {
    dispatch(updateListFailure(error.response.data.message));
  }
};
