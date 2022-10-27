import { onAuthStateChanged, User } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  snapshotEqual,
  updateDoc,
  where,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../client/supabase";

import { auth, db } from "../firebase/credentials";
import { cerrarSesion, deletestring } from "../firebase/services";
import Product from "../interfaces/Product";
// import User from "../interfaces/User";
import routes from "../routers/routes";

interface ProductContext {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  getProducts: () => Promise<void>;
  createProduct: (product: Product, email: string) => Promise<void>;
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
  const [primerInicio, setPrimerInicio] = useState();

  // const [user, setUser] = useState(null)
  const [productSelected, setProductSelected] = useState(null);

  //
  const [user, setUser] = useState<User>();

  // const loginWithMagicLink = async (email: string) => {
  //   // aca nunca deberiaa llegar si esta logueado
  //   setLoading(true);
  //   let ok = false;

  //   try {
  //     const { error, user } = await supabase.auth.signIn({ email });

  //     if (error) {
  //       throw error;
  //     }
  //     ok = true;
  //   } catch (error: any) {
  //   } finally {
  //     setLoading(false);
  //   }
  //   return ok;
  // };

  const logout = async () => {
    console.log(user);
    setLoading(true);

    try {
      cerrarSesion();
      navigate(routes.login);

      setUser(null);
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: Product, email: string) => {
    console.log("create product user", user)
    setLoading(true);
    try {
      const collectionRef = collection(db, email);
      const res = await addDoc(collectionRef, product);
      product.id = res.id;
      console.log("response create product: ", res);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    setLoading(true);

    try {
      const q = query(
        collection(db, user.email),
        // where("user", "==", user.email)
      );
      getDocs(q).then((snapshot) => {
        if (snapshot.size === 0) {
          console.log("no hay datos");
        }
        setProducts(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
      // const productsUser = productsSnahsop.docs.map((p) => {
      //   let product = p.data();
      //   product.id = p.id;

      //   return product;
      // });

      // setProducts(productsUser);
      // console.log("products: " + productsUser)
    } catch (error) {
      // alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProducts = async (updatedFields: Product, id: string) => {
    setLoading(true);
    console.log("campos", updatedFields);
    try {
      const docRef = doc(db, user.email, id.toString());
      const res = await updateDoc(docRef, {
        ...updatedFields,
      });
      console.log("product updated", res);

      // let pos = products.findIndex((p) => p.id === id);

      // const newList = [...products];

      // newList[pos] = { ...newList[pos], ...updatedFields };

      // setProducts(() => newList);
    } catch (error) {
      // alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (product: Product) => {
    try {
      setLoading(true);

      const docRef = doc(db, user.email, product.id);
      const res = await deleteDoc(docRef);
      product.image.forEach((i) => {
        deletestring(i, user.email, product.title);
      });
      console.log("product deleted", res);

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

  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
  //     checkUser()
  //   );

  //   const checkUser = async () => {
  //     const user = supabase.auth.user();

  //     if (user) {
  //       setUser({
  //         email: user.email,
  //         id: user.id,
  //       });
  //       navigate("/", { replace: true });
  //     } else {
  //       navigate("/login", { replace: true });
  //     }
  //   };
  //   checkUser();
  //   console.log('user', user)

  //   return () => {
  //     authListener?.unsubscribe();
  //   };
  // }, []);
  // useEffect(() => {
  //   if (user?.id) {
  //     getProducts();

  //   }

  // }, [user?.id]);

  useEffect(() => {
    onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUser(usuarioFirebase);
      } else {
        setUser(null);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      products,
      getProducts,
      createProduct,
      updateProducts,
      deleteProduct,
      loading,
      setLoading,
      setProducts,
      // loginWithMagicLink,
      logout,
      productSelected,
      setProductSelected,
      user,
      setUser,
    }),
    [
      products,
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
      setUser,
    ]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
