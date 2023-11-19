import { callApi } from "../helper";
import {
  setApplications,
  setApprovedApp,
  setCustomers,
  setLawyerApp,
  setNavigateTo,
  setPendings,
  setStaffs,
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
  const options = {
    url: "/application/all",
    dispatch,
    token: user?.token,
  };
  if (data) options.body = data;
  const res = await callApi(options);
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

export const getCustomers = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const options = {
    url: "/users/client",
    dispatch,
    token: user?.token,
  };
  const res = await callApi(options);
  if (res) dispatch(setCustomers(res.result));
};

export const pay = (data) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await callApi({
    url: "/payment/pay",
    dispatch,
    body: data,
    token: user?.token,
  });
  if (res) {
    dispatch(setSuccess(res.message));
  }
};

export const getStaffs = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const options = {
    url: "/users/staff",
    dispatch,
    token: user?.token,
  };
  const res = await callApi(options);
  if (res) dispatch(setStaffs(res.result));
};

export const assignLawyer = (data) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await callApi({
    url: "/application/assignLawyer",
    dispatch,
    body: data,
    token: user?.token,
  });
  if (res) {
    dispatch(setSuccess(res.message));
    dispatch(getAllApplication({ status: "approved" }, setApprovedApp));
  }
};

export const getLaywerApplication = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const options = {
    url: "/application/lawyerApplication",
    dispatch,
    token: user?.token,
  };
  const res = await callApi(options);
  if (res) dispatch(setLawyerApp(res.result));
};
