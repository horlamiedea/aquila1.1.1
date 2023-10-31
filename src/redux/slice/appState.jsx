import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  projects: null,
  profile: null,
  currentProject: "",
  reports: null,
  scanFile : null
};

const appStateSlice = createSlice({
  name: "appState",
  initialState: initialState,
  reducers: {
    TOGGLE_OPENMODAL: (state) => {
      state.openModal = !state.openModal;
    },
    ADD_PROJECTS: (state, action) => {
      state.projects = action.payload;
    },
    ADD_PROFILE: (state, action) => {
      state.profile = action.payload;
    },
    SET_CURRENTPROJECT: (state, action) => {
      state.currentProject = action.payload;
    },
    SET_REPORT: (state, action) => {
      state.reports = action.payload;
    },
    SET_SCANFILE: (state, action) => {
      state.scanFile = action.payload;
    },
  },
});
export const {
  TOGGLE_OPENMODAL,
  ADD_PROJECTS,
  ADD_PROFILE,
  SET_CURRENTPROJECT,
  SET_REPORT,
  SET_SCANFILE
} = appStateSlice.actions;
export default appStateSlice.reducer;
