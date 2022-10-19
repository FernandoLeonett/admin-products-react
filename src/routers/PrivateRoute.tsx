import { Outlet, useLocation, useSearchParams } from "react-router-dom";
// import { supabase } from "../firebase/credentials";
import { useProducts } from "../context/context";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";

const PrivateRoute = () => {

    // const [se] = useSearchParams()
    // console.log("se", se.entries())
    const { user } = useProducts()
    // const user = supabase.auth.user()



    return user ? <Outlet /> : <LoginPage />;
};
export default PrivateRoute;
