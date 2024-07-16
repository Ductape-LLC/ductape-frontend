import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import store from "@/redux/store";
import ReduxProvider from "@/context/redux-provider";

const raleway = Raleway({
  subsets: ["latin-ext"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Ductape - Build products that scale with Ductape SDK and CLI",
  description:
    "Build products that scale with Ductape SDK and CLI. Ductape allows you to build scalable and maintainable integrations with less code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Toaster
          toastOptions={{
            duration: 5000,
          }}
          position="top-center"
          reverseOrder={false}
          containerStyle={{ zIndex: 99999999999 }}
        />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
