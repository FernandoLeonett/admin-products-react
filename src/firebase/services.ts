import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import Product from "../interfaces/Product";
import firebaseApp from "./credentials";
const firestore = getFirestore(firebaseApp);




export async function saveData(product: Product) {
  try {
    const orderRef = collection(firestore, "products");
    const res = await addDoc(orderRef, product)
    return res;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
