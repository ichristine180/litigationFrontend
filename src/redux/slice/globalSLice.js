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
    customers: [],
    approvedApp: [],
    staffs: [],
    lawyers: [],
    lawyerApp: [],
    catSeries: [0, 0, 0, 0],
    tasks: [],
    lawyerData: [],
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
    setApprovedApp: (state, action) => {
      state.approvedApp = action.payload;
    },
    setStaffs: (state, action) => {
      state.staffs = action.payload;
    },
    setLawyers: (state, action) => {
      state.lawyers = action.payload;
    },
    setLawyerApp: (state, action) => {
      state.lawyerApp = action.payload;
    },
    setCatReport: (state, action) => {
      state.catSeries = action.payload;
    },
    setLawyerReport: (state, action) => {
      state.lawyerData = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
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
  setCustomers,
  setApprovedApp,
  setStaffs,
  setLawyers,
  setLawyerApp,
  setCatReport,
  setLawyerReport,
  setTasks,
} = globalReducer.actions;

export default globalReducer.reducer;
