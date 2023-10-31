// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const globalReducer = createSlice({
  name: "global",
  initialState: {
    loading: false,
    success: null,
    error: null,
    navigateTo: null,
    applications: [],
    pendingApp: [],
    allApp: [],
    customers:[]
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setNavigateTo: (state, action) => {
      state.navigateTo = action.payload;
    },
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    setPendings: (state, action) => {
      state.pendingApp = action.payload;
    },
    setAllApplications: (state, action) => {
      state.allApp = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
  },
});

export const {
  setLoading,
  setSuccess,
  setError,
  setNavigateTo,
  setApplications,
  setPendings,
  setAllApplications,
  setCustomers
} = globalReducer.actions;

export default globalReducer.reducer;
