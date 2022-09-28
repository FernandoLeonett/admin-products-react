import { useEffect, useState } from "react";
import { useProducts } from "../../context/context";
import { CLOUD_NAME } from "../../util/util";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./Layout.css";

const Layout = ({ children }) => {
  const { products } = useProducts();
  const productosDestacados = products.filter((p) => p.boost);

  return (
    <>
      <Header />
      {/* {JSON.stringify(productosDestacados)} */}
      Destacadps{productosDestacados.length}
      {/* {
        setIsReadyForInstall &&
        <button onClick={downloadApp}> Descargasdasda </button>
      } */}
      {productosDestacados.length < 3 ? (
        <p>
          Puedes mostrar tus productos destacados en la parte superior de tu
          tienda, para ello necesitas destacar
          {3 - productosDestacados.length}
        </p>
      ) : (
        <p>
          El banner de tu tienda se mostrará cuando tengas menos de 3 productos
          destacados.
        </p>
      )}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
