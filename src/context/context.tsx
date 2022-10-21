import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../client/supabase";

import { db } from "../firebase/credentials";
import { deleteImageFireBase } from "../firebase/services";
import Product from "../interfaces/Product";
import User from "../interfaces/User";
import routes from "../routers/routes";

interface ProductContext {
  products: Product[];
  getProducts: () => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  updateProducts: (updatedFields: Product, id: string) => Promise<void>;
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


      const collectionRef = collection(db, "products");
      const res = await addDoc(collectionRef, product);
      
      setProducts([...products, product]);

 
      console.log("response create product: ", res);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    setLoading(true);

    const productsSnahsop = await getDocs(collection(db, "products"));


    try {
      const productsUser =  productsSnahsop.docs.map((p) => {
        let product = p.data();
        product.id = p.id;

        return product;
      });
  

      setProducts(productsUser);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProducts = async (updatedFields: Product, id: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, "products", id.toString());
      const res = await updateDoc(docRef, {
        updatedFields,
      });
      console.log("product updated",res)

      let pos = products.findIndex((p) => p.id === id);

      const newList = [...products];

      newList[pos] = {...newList[pos], ...updatedFields};

      setProducts(() => newList);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (product: Product) => {
    try {
   
      setLoading(true);

      const docRef = doc(db, "products", product.id);
      const res = await deleteDoc(docRef);
      product.image.forEach((i) => {
        deleteImageFireBase(i.email,i.productTitle,i.fileName, i.id, i.dime);
      });
      console.log("product deleted", res)

      setProducts(products.filter((Product) => Product.id !== product.id));
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
    console.log('user', user)

    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (user?.id) {
      getProducts();

    }







  }, [user?.id]);

  const value = useMemo(() => ({
    products,
    getProducts,
    createProduct,
    updateProducts,
    deleteProduct,
    loading,
    setLoading,

    // loginWithMagicLink,
    // logout,
    productSelected,
    setProductSelected,
    user,
    setUser,
  }), [products,
    getProducts,
    createProduct,
    updateProducts,
    deleteProduct,
    loading,
    setLoading,

    // loginWithMagicLink,
    logout,
    productSelected,
    setProductSelected,
    user,
    setUser]);


  return (
    <ProductContext.Provider
      value={value}
    >
      {children}
    </ProductContext.Provider>
  );
};
