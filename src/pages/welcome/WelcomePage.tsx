import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useProducts } from "../../context/context";
import {atraparInicioSesion} from "../../firebase/services";
import routes from "../../routers/routes";

const WelcomePage = () => {
  const { user } = useProducts();

  React.useEffect(() => {
    //correr funcion que atrape el inicio de sesión
    atraparInicioSesion(window.location.href);
  }, []);

  return (
    <>
      <div>Bienvenido</div>
      {/* <Link to={routes.home}>Empezar</Link> */}
    </>
  );
};

export default WelcomePage;
