import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import globalReducer from './slice/globalSLice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    global:globalReducer
  },
  middleware: [thunk], 
});