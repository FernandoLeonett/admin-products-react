import { onAuthStateChanged, User } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/credentials";
import { cerrarSesion, deletestring } from "../firebase/services";
import Product from "../interfaces/Product";
import routes from "../routers/routes";

interface ProductContext {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  getProducts: (user: User) => Promise<void>;
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
  const [productSelected, setProductSelected] = useState(null);
  const [user, setUser] = useState<User>();

  const logout = async () => {
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
    setLoading(true);
    try {
      const collectionRef = collection(db, email);
      const res = await addDoc(collectionRef, product);
      product.id = res.id;
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async (user: User) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://us-central1-admin-gregory-shop.cloudfunctions.net/app/api/products/" +
          user.email
      );
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      alert(error.error_description || error.message);
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
    } catch (error) {
      alert(error.error_description || error.message);
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

  useEffect(() => {
    onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUser(usuarioFirebase);
        getProducts(usuarioFirebase);
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
