import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

// hack to fix redux-persist failed to create sync storage. falling back to noop storage error
// https://github.com/vercel/next.js/discussions/15687#discussioncomment-45319

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

import userReducer from "./slice/userSlice";
import workspaceReducer from "./slice/workspaceSlice";
import appReducer from "./slice/appSlice";

const rootReducer = combineReducers({
  workspace: workspaceReducer,
  user: userReducer,
  app: appReducer,
});

const persistConfig = {
  key: "ductape-store",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
