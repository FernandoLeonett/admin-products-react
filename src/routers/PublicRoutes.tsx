import { Outlet } from "react-router-dom";
import { supabase } from "../client/supabase";

import { useProducts } from "../context/context";
import HomePage from "../pages/home/HomePage";
const PublicRoute: React.FC = () => {

    // const { user } = useProducts()
    const user = supabase.auth.user()



    return user ? <HomePage /> : <Outlet />;
};
export default PublicRoute;