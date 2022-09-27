import { useEffect, useState } from "react";
import { CLOUD_NAME } from "../../util/util";
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
      CLOUD_NAME:{CLOUD_NAME}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
