import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./Layout.css";

const Layout = ({ children }) => {

  return (
    <>
      <Header />

      {/* {
        setIsReadyForInstall &&
        <button onClick={downloadApp}> Descargasdasda </button>
      } */}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
