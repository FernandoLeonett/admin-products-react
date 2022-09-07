import { Dispatch, SetStateAction, useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../client/supabaase";
import { deleteImage } from "../components/cloudinary/Service";
import Product from "../interfaces/Product";
import User from "../interfaces/User";
import routes from "../routers/routes";

interface ProductContext {
  products: Product[];
  getProducts: () => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  updateProducts: (id: number, updatedFields: Product) => Promise<void>;
  deleteProduct: (product: Product) => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;

  loginWithMagicLink: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  productSelected: Product | undefined;
  setProductSelected: Dispatch<SetStateAction<Product>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}
export const ProductContext = createContext({});

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context as ProductContext;
};

export const ProductContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // const [user, setUser] = useState(null)
  const [productSelected, setProductSelected] = useState(null);

  //
  const [user, setUser] = useState<User>();

  const loginWithMagicLink = async (email: string) => {
    // aca nunca deberiaa llegar si esta logueado
    setLoading(true);
    let ok = false;

    try {
      const { error, user } = await supabase.auth.signIn({ email });

      if (error) {
        throw error;
      }
      ok = true;
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
    return ok;
  };

  const logout = async () => {
    console.log(user);

    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }

      console.log("sesion cerrada");
      navigate(routes.login);

      setUser(null);
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: Product) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();
      // const [id, ...rest] = products

      const { error, data } = await supabase.from("products").insert({
        ...product,
        userId: user.id,
      });

      setProducts([...products, ...data]);

      if (error) {
        throw error;
      }
      console.log("data create", data);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    setLoading(true);

    const user = supabase.auth.user();

    try {
      const { error, data } = await supabase
        .from("products")
        .select("id, title,description,price,category, image, boost")

        .eq("userId", user.id);

      // .order("id", { ascending: false });

      if (error) {
        throw error;
      }
      console.log("data: ", data);

      setProducts(data);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProducts = async (id, updatedFields: Product) => {
    try {
      const user = supabase.auth.user();
      const { error, data } = await supabase
        .from("products")
        .update(updatedFields)
        .eq("userId", user.id)
        .eq("id", id);
      if (error) {
        throw error;
      }

      let pos = products.findIndex((p) => p.id === id);

      const newList = [...products];

      newList[pos] = data[0];

      setProducts(() => newList);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (product: Product) => {
    try {
      const user = supabase.auth.user();
      setLoading(true);

      const { error, data } = await supabase
        .from("products")
        .delete()
        .eq("userId", user.id)
        .eq("id", product.id);

      if (error) {
        throw error;
      }
      product.image.forEach((i) => {
        deleteImage(i);
      });

      setProducts(products.filter((Product) => Product.id !== data[0].id));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  // useLayoutEffect(() => {
  //     const user = supabase.auth.user();
  //     if (user?.id) {
  //         setUser({
  //             id: user.id,

  //         });

  //     }

  // }, [user?.id]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
      checkUser()
    );

    const checkUser = async () => {
      const user = supabase.auth.user();

      if (user) {
        setUser({
          email: user.email,
          id: user.id,
        });
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    };
    checkUser();

    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (user?.id) {
      getProducts();
      console.log("me ejecute");
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        createProduct,
        updateProducts,
        deleteProduct,
        loading,
        setLoading,

        loginWithMagicLink,
        logout,
        productSelected,
        setProductSelected,
        user,
        setUser,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
