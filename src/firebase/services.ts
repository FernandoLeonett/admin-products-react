import {
  fetchSignInMethodsForEmail,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import Product from "../interfaces/Product";
import { auth, db, storage } from "./credentials";

export async function getUserByEmail(email: string) {
  const res = await fetchSignInMethodsForEmail(auth, email);
  if (res.length == 0) {
    console.log("no hay usuario");
    return false;
  } else {
    console.log("no hay usuario");
    return true;
  }
}
//   getAuth()
//   .getUserByEmail(email)
//     .then((userRecord) => {
//       // See the UserRecord reference doc for the contents of userRecord.
//       console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//     })
//     .catch((error) => {
//       console.log("Error fetching user data:", error);
//     });

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
  file: File,
  email: string,
  productTitle: string,
  id: string
) {
  console.log("id recibilo", id);
  // Object.values(imageUpload).forEach(async (file: File) => {
  if (file == null) return;

  // console.log("esto es cada file", file)
  const imageRef = ref(storage, `${email}/${productTitle}/${file.name}${id}`);

  try {
    const res = await uploadBytes(imageRef, file);
    console.log("upload data", res);

    return res;
  } catch (error) {
    console.log(error);
  }
  // });
}

export async function deletestring(
  url, email, title
  // email: string,
  // title: string,
  // fileName: string,
  // id: string,
  // dime: string
){
  const pos1 = url.indexOf("%2F");
  const pos2 = url.indexOf("?");
  let imageName = url.substring(pos1 + 3, pos2);
  console.log("url", url, "email", email, "title", title, "imageName", imageName );

// let pathLeft = `${email}%2F${title}%2F`;
// pathLeft = superReplaceAny(pathLeft, "@", "%40");
// console.log("sin arroba", pathLeft)
// pathLeft = superReplaceAny(pathLeft, " ", "%20");
// console.log("sin espacios", pathLeft);
  // email.replaceAll("@", "%40")
  // let ruta = `${pathLeft}${imageName}`;
  // const refer = ref(storage, ruta);
  const ruta = imageName.replaceAll("%2F", "/")
  const refer = ref(storage, `${email}/${ruta}`);
  // const refer = ref(storage, `${email}/${title}/${fileName}${id}_${dime}`);
  // console.log("ruta", ruta);

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
export function cerrarSesion() {
  signOut(auth);
}
export function enviarEnlaceLogin(correo) {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    url: "https://app.tiendasgregory.com/login",

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
