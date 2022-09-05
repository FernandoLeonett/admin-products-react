import { BrowserRouter, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { ProductContextProvider, useProducts } from "./context/context";
import AppRouter from "./routers/AppRouter";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect } from "react";
import { supabase } from "./client/supabaase";
import Layout from "./components/layout/Layout";

function App() {
  const navigate = useNavigate();
  // const { setUser } = useProducts()
  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     if (!session) {
  //       navigate("/login");
  //       // setUser(null)
  //     } else {
  //       navigate("/");
  //     }
  //   });
  // }, [navigate]);
  return (


    <ProductContextProvider>
      <Layout>
        <AppRouter />
        <ToastContainer />
      </Layout>
    </ProductContextProvider>




  );
}

export default App;
