import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaces: [],
  defaultWorkspace: null,
  workspaceStats: {
    apps: 0,
    integrations: 0,
    inbound_requests: 0,
    outbound_requests: 0,
  },
  showCreateWorkspaceModal: false,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    },
    setDefaultWorkspace: (state, action) => {
      state.defaultWorkspace = action.payload;
    },
    setWorkspaceStats: (state, action) => {
      state.workspaceStats = action.payload;
    },
    setShowCreateWorkspaceModal: (state, action) => {
      state.showCreateWorkspaceModal = action.payload;
    },
  },
});

export const {
  setWorkspaces,
  setDefaultWorkspace,
  setWorkspaceStats,
  setShowCreateWorkspaceModal,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
