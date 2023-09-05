import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    app_id: null,
}

const appSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {
        setAppId: (state, action) => {
            state.app_id = action.payload;
        },
    }
});

export const { setAppId } = appSlice.actions;

export default appSlice.reducer;