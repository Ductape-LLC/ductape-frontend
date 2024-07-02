import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    app: null,
    builder: null,
}

const appSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {
        setApp: (state, action) => {
            state.app = action.payload;
        },
        setBuilder: (state, action) => {
            state.builder = action.payload
        },
    }
});

export const { setBuilder } = appSlice.actions;

export const { setApp } = appSlice.actions;

export default appSlice.reducer;