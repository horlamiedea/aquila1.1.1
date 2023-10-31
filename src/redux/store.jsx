
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth"
import appStateReducer from "./slice/appState";
import chatReducer from "./slice/chat"

const store = configureStore({
    reducer: {
        auth : authReducer,
        appState : appStateReducer,
        chat: chatReducer
    },
  });



  export default store