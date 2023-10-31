import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 anonUser : null,
 loggedInUser: null,
 customerRep : null,

};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    ADD_ANON_USER: (state,action) => {
        state.anonUser = action.payload;
    },
    ADD_LOGGEDIN_USER: (state,action) => {
        state.loggedInUser = action.payload;
    },
    ADD_CUSTOMER_REP: (state,action) => {
        state.customerRep = action.payload;
    },
   
  },
});
export const {
    ADD_ANON_USER,ADD_LOGGEDIN_USER,  ADD_CUSTOMER_REP

} = chatSlice.actions;
export default chatSlice.reducer;
