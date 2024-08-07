"use client";

import store from "@/redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  persistStore(store);

  return <Provider store={store}>{children}</Provider>;
}
