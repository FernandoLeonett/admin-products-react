import { memo, useEffect } from "react";
import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import Card from "../../components/card/Card";
import Spinner from "../../components/spinner/Spinner";
import { supabase } from "../../client/supabaase";
import ButtonUp from "../../components/buttonUp/ButtonUp";
import "./HomePage.css";

const HomePage = () => {
  const { getProducts, loading, products, user } = useProducts();
  const productosDestacados = products.filter((p) => p.boost);

  // useEffect(() => {
  //   console.log(user);

  //   // }, [products])

  //   getProducts();
  // }, []);

  return (
    <>
      <div
        style={{ zIndex: 5, position: "fixed", top: "13rem", left: "0.5rem" }}
      >
        <p>
          <button
            className="btn  w-auto  color-destacados"
            type="button"
            data-toggle="collapse"
            data-target="#collapseWidthExample"
            aria-expanded="false"
            aria-controls="collapseWidthExample"
          >
            Destacados: {productosDestacados.length}
          </button>
        </p>
        <div className="row w-auto ">
          <div className="collapse width col-xs-4 " id="collapseWidthExample">
            {productosDestacados.length < 3 ? (
              <div
                className="card card-body alert-dark  p-3"
                // style={{ backgroundColor: "#000000" }}
              >
                Puedes mostrar tus productos destacados en la parte superior de
                tu tienda, para ello necesitas destacar
                {3 - productosDestacados.length}
              </div>
            ) : (
              <div
                className="card card-body alert-secondary  p-3"
                // style={{ backgroundColor: "#000000" }}
              >
                El banner de tu tienda se mostrará cuando tengas menos de 3
                productos destacados.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <p className="saludo text-right text-secondary mt-1">
          😎Bienvenido {user.email}
        </p>

        <div className="row d-flex justify-content-center mt-4">
          {loading ? (
            <Spinner />
          ) : Boolean(products.length) ? (
            <>
              {products.map((product: Product, i) => (
                <Card key={i} product={product} />
              ))}
              <ButtonUp />
            </>
          ) : (
            // <div className="container">
            //   <div className="row">
            <div className="col-12">
              {/* <div className="col-12 mt-5 d-flex justify-content-center align-items-center"> */}
              <h1>No tienes productos en tu tienda 😬</h1>
            </div>
            //</div>
            //</div>
          )}
        </div>
      </div>
    </>
  );
};

// export default memo(HomePage);
export default HomePage;
