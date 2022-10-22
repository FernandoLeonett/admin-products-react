import { async } from "@firebase/util";
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, signOut } from "firebase/auth";
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
import { auth, db, storage } from "./credentials";



export async function saveData(product: Product) {
  try {
    const collectionRef = collection(db, "products");
    const res = await addDoc(collectionRef, product);
    return res;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// export async function updateProducts(fields: Product, id) {
//   try {
//     const docRef = doc(firestore, "products", id.toString());
//     const res = await updateDoc(docRef, {
//       fields,
//     });
//     return res;
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

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
// export async function deleteProduct(id: string) {
//   try {
//     const docRef = doc(firestore, "products", id);
//     const res = await deleteDoc(docRef);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// }
// export const getItems = async () => {
//   const productsSnahsop = await getDocs(collection(db, "products"));

//   try {
//     const products = productsSnahsop.docs.map((d) => {
//       let disc = d.data();
//       disc.id = d.id;

//       return disc;
//     });
//     return products;
//   } catch (error) {
//     console.log(error);
//   }
// };

export function atraparInicioSesion(url) {
  if (isSignInWithEmailLink(auth, url)) {
    const correoRegistro = window.localStorage.getItem("correo");

    signInWithEmailLink(auth, correoRegistro, url)
      .then((result) => {
        console.log("éxito", result);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("error", error);
      });
  } else {
    console.log("no es un enlace de inicio de sesión");
  }
}
export  function cerrarSesion() {
  signOut(auth);
}
export function enviarEnlaceLogin(correo) {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    url: "http://localhost:3000/welcome",

    handleCodeInApp: true,
    // iOS: {
    //   bundleId: "com.example.ios"
    // },
    // android: {
    //   packageName: "com.example.android",
    //   installApp: true,
    //   minimumVersion: "12"
    // },
  };

  sendSignInLinkToEmail(auth, correo, actionCodeSettings)
    .then((response) => {
      console.log("éxito", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
}


