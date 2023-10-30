import { callApi } from "../helper";
import {
  setApplications,
  setNavigateTo,
  setPendings,
  setSuccess,
} from "../slice/globalSLice";

export const getUserApplication = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await callApi({
    url: "/application/userapplication",
    dispatch,
    token: user?.token,
  });
  if (res) dispatch(setApplications(res.result));
};

export const requestConsulation = (data) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await callApi({
    url: "/application/apply",
    dispatch,
    body: data,
    token: user?.token,
  });
  if (res) {
    dispatch(setSuccess(res.message));
    dispatch(setNavigateTo("/"));
  }
};

export const getAllApplication = (data, callAction) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await callApi({
    url: "/application/all",
    dispatch,
    body: data,
    token: user?.token,
  });
  if (res) dispatch(callAction(res.result));
};

export const validateApplication = (data) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await callApi({
    url: "/application/validate",
    dispatch,
    body: data,
    token: user?.token,
  });
  if (res) {
    dispatch(getAllApplication({ status: "pending" }, setPendings));
    dispatch(setSuccess(res.message));
  }
};
