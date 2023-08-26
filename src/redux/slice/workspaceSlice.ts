import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    workspaces: [],
    defaultWorkspace: null,
}

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        setWorkspaces: (state, action) => {
            state.workspaces = action.payload;
        },
        setDefaultWorkspace: (state, action) => {
            state.defaultWorkspace = action.payload;
        }
    }
});

export const { setWorkspaces, setDefaultWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;