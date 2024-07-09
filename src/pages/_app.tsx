import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Raleway } from "next/font/google";
import Router from "next/router";
import NProgress from "nprogress";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import store from "../redux/store";
import { LoadingOutlined } from "@ant-design/icons";

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const raleway = Raleway({
  subsets: ["latin-ext"],
  variable: "--font-raleway",
});

export default function App({ Component, pageProps }: AppProps) {
  persistStore(store);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <Provider store={store}>
      {loading ? (
        <div className="h-full w-100 bg-primary_transparent text-center d-flex flex-row justify-content-center align-items-center">
          <LoadingOutlined className="text-primary icon_large" rotate={180} />
        </div>
      ) : (
        <main className={raleway.className}>
          <Component {...pageProps} />
        </main>
      )}

      <Toaster
        toastOptions={{
          duration: 5000,
        }}
        position="top-center"
        reverseOrder={false}
        containerStyle={{ zIndex: 99999999999 }}
      />
    </Provider>
  );
}
