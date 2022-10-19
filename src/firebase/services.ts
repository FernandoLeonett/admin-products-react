import { async } from "@firebase/util";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { ref, getStorage, uploadBytes, deleteObject } from "firebase/storage";
import Product from "../interfaces/Product";
import firebaseApp from "./credentials";
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export async function saveData(product: Product) {
  try {
    const collectionRef = collection(firestore, "products");
    const res = await addDoc(collectionRef, product);
    return res;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updateProducts(fields: Product, id) {
  try {
    const docRef = doc(firestore, "products", id.toString());
    const res = await updateDoc(docRef, {
      fields,
    });
    return res;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function uploadData(
  imageUpload: File[],
  email: string,
  productTitle: string,
  id: string
) {
  Object.values(imageUpload).forEach(async (file: File) => {
    if (file == null) return;

    // console.log("esto es cada file", file)
    const imageRef = ref(storage, `${email}/${productTitle}/${file.name}${id}`);

    try {
      const res = await uploadBytes(imageRef, file);

      return res;
    } catch (error) {
      console.log(error);
    }
  });
}

export async function deleteImageFireBase(
  email: string,
  title: string,
  fileName: string,
  id: string,
  dime: string
) {
  const refer = ref(storage, `${email}/${title}/${fileName}${id}_${dime}`);

  try {
    const res = await deleteObject(refer);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteProduct(id: string) {
  try {
    const docRef = doc(firestore, "products", id);
    const res = await deleteDoc(docRef);
    return res;
  } catch (error) {
    console.log(error);
  }
}
