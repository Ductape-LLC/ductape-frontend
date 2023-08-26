import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slice/userSlice';
import workspaceReducer from './slice/workspaceSlice';

const rootReducer = combineReducers({
  user: userReducer,
    workspace: workspaceReducer,
});

const persistConfig = {
  key: 'pastel-dashboard-2fa',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;