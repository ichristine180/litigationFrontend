import { callApi } from "../helper";
import { loginUser } from "../slice/authSlice";
import { setNavigateTo, setSuccess } from "../slice/globalSLice";
import { getStaffs } from "./globalThunk";

export const register = (data) => async (dispatch) => {
  const res = await callApi({ url: "/users/register", body: data, dispatch });
  console.log(res);
  if (res?.message) {
    dispatch(setSuccess(res?.message));
    dispatch(setNavigateTo("/login"));
  }
};
export const newStaff = (data) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await callApi({
    url: "/users/staffregistration",
    body: data,
    token: user?.token,
    dispatch,
  });
  if (res?.message) {
    dispatch(getStaffs());
    dispatch(setSuccess(res?.message));
  }
};
export const login = (data, navigate) => async (dispatch) => {
  const res = await callApi({ url: "/login", body: data, dispatch });
  if (res) {
    localStorage.setItem("user", JSON.stringify(res.result));
    dispatch(loginUser(res.result));
    navigate("/");
  }
};
