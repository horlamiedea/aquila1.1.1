import { createSlice } from "@reduxjs/toolkit";


const initialState = {token : null};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  
    LOGIN_USER: (state, action) => {
      state.token = action.payload;
    
    },
    LOGOUT_USER: (state) => {
      state.token = null
    },
  },
});


export const { LOGIN_USER,LOGOUT_USER } = authSlice.actions;
export default authSlice.reducer;
