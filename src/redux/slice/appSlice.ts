import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    app: null,
}

const appSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {
        setApp: (state, action) => {
            state.app = action.payload;
        },
    }
});

export const { setApp } = appSlice.actions;

export default appSlice.reducer;