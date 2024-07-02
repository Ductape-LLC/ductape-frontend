import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slice/userSlice';
import workspaceReducer from './slice/workspaceSlice';
import appReducer from './slice/appSlice';

const rootReducer = combineReducers({
    workspace: workspaceReducer,
    user: userReducer,
    app: appReducer,
});

const persistConfig = {
  key: 'ductape-store',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;