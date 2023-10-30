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
  },
});

export const {
  setLoading,
  setSuccess,
  setError,
  setNavigateTo,
  setApplications,
  setPendings,
} = globalReducer.actions;

export default globalReducer.reducer;
