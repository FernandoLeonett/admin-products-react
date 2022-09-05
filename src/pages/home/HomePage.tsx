import { memo, useEffect } from "react";
import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import Card from "../../components/card/Card";
import Spinner from "../../components/spinner/Spinner";
import { supabase } from "../../client/supabaase";

const HomePage = () => {
  const { getProducts, loading, products, user } = useProducts();




  useEffect(() => {
    console.log(user)

    getProducts()



  }, [])



  return (
    <div className="container">
      <div className="row my-5">
        {loading ? (
          <Spinner />
        ) : Boolean(products.length) ? (
          <>
            {products.map((product: Product, i) => (
              <Card key={i} product={product} />
            ))}
          </>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-12 mt-5 d-flex justify-content-center align-items-center">
                <h1>No tienes productos en tu tienda 😬</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// export default memo(HomePage);
export default (HomePage);