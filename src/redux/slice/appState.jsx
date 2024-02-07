import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  projects: null,
  profile: null,
  currentProject: "",
  reports: null,
  scanFile : null,
  reportHistory : null,
  reportHistoryId : null,
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
    
    DELETE_PROJECT: (state, action) => {
      state.projects = state.projects.filter(project => project.name !== action.payload);
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

    SET_REPORT_HISTORY: (state, action) => {
      state.reportHistory = action.payload;
    },

    SET_REPORT_HISTORY_ID: (state, action) => {
      state.reportHistoryId = action.payload;
    },
  },
});
export const {
  TOGGLE_OPENMODAL,
  ADD_PROJECTS,
  ADD_PROFILE,
  DELETE_PROJECT,
  SET_CURRENTPROJECT,
  SET_REPORT,
  SET_SCANFILE, 
  SET_REPORT_HISTORY,
  SET_REPORT_HISTORY_ID
} = appStateSlice.actions;
export default appStateSlice.reducer;
