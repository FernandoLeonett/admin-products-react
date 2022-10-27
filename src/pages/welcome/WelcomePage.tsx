import React from "react";
import { useProducts } from "../../context/context";
import {atraparInicioSesion} from "../../firebase/services";

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
