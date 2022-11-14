import { uploadData } from "../firebase/services";
import { v4 } from "uuid";

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function validateAllType(types) {
  let ok = true;
  types.forEach((a) => {
    console.log("file: ", a.type);

    if (
      a.type !== "image/jpeg" &&
      a.type !== "image/png" &&
      a.type !== "image/jpg" &&
      a.type !== "image/gif" &&
      a.type !== "image/tiff" &&
      a.type !== "image/webp"
    ) {
      ok = false;
    }
  });
  return ok;
}

//  export function getUrl(
//   { fileName,
//    bucketName,
//    id,
//    email,
//    productTitle,
//    dime = "600x600"}:string
//  ) {
 

//    if (fileName.indexOf(" ") !== -1) {
//      fileName = fileName.replaceAll(" ", "%20");
//    }

//    let url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}.appspot.com/o/${email}%2F${productTitle}%2F${fileName}${id}_${dime}?alt=media`;

//    if (url.indexOf(" ") !== -1) {
//      url = url.replaceAll(" ", "%20");
//    }
//    if (url.indexOf("@") !== -1) {
//      url = url.replaceAll(" ", " %40");
//    }

//    return url;
//  }


 export const bucketName = "admin-gregory-shop"


 export function generateUrlsImage(
   imageUpload: File[],
   bucketName: string,
   email: string,
   productTitle: string,
   dime = "600x600"
 ) {
   const urls: string[] = [];
   const id = v4();

   Object.values(imageUpload).forEach((file: File) => {
     urls.push(`https://firebasestorage.googleapis.com/v0/b/${bucketName}.appspot.com/o/${email}%2F${productTitle}%2F${file.name}${id}_${dime}?alt=media`);
     uploadData(file, email, productTitle,id);
   });
   return urls
 }


 export const superReplaceAny = (
   pText: string,
   oldChart: string,
   newChart: string
 ) => {
   let texto = "";

   for (let i = 0; i < pText.length; i++) {
     const a = pText[i];

     if (a == oldChart) {
       texto += newChart;
     } else {
       texto += a;
     }
   }

   return texto;
 };

 export const getTitleUrl = (url) => {
  const pos1 = url.lastIndexOf("%2F");
  const pos2 = url.lastIndexOf(".");
  const title = url.substring(pos1 + 3, pos2);
  return title
 }

 export const landingPageUrl = "https://tiendasgregory.com/";
 export const instagram = "https://www.instagram.com/tiendasgregory/";
 export const facebook = "https://www.facebook.com/tiendasgregory/";
