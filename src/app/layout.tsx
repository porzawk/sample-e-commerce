"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>E-Commerce</title>
      </head>
      <body>
        <Provider store={store}>
          {/* Navbar */}
          <Navbar />
          {/* Sidebar */}
          <Sidebar />
          {/* Content */}
          <div className="pl-56 pt-12 h-screen bg-[#F4F7FE] ">
            <div className="h-full overflow-y-auto p-4 ">{children}</div>
          </div>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
