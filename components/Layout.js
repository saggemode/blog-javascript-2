import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div className="flex flex-col min-h-[100vh]">
        <NextNProgress height={7} />
        {/* <Navbar /> */}
        <Header />
        <main className="flex-grow  md:mt-40">{children}</main>
        <Footer />
      </div>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        position="top-right"
      />
    </ThemeProvider>
  );
};

export default Layout;
