import ImageFireBase from "../interfaces/ImageFIreBase";
import a from "../interfaces/ImageFIreBase";
import Product from "../interfaces/Product";
import User from "../interfaces/User";

export const getPublicIdFromPath = (path: string) => {
  const separateBySlash = path.split("/");
  const publicId = separateBySlash[1] + "/" + separateBySlash[2];

  return publicId;
};
export const MAX_FILES: number = 4;
export const MAX_FILE_SIZE = 4 * 1024 * 1024;
export const CLOUD_NAME = "matiascabral";
export const API_KEY = "548439612459673";
export const UPLOAD_PRESET = `matiascabral`;
export const API_SECRET = "2-IaP7dE8q-Oq8aPJDcOX_qLTDs";
// export const getPublicIdImage = (url: string) => {
//   const arr = url.split("/");
//   const last = arr[arr.length - 1];

//   const pid = last.split(".")[0];
//   return pid;
// };

// export const getPublicId = (url) => {
//   const publicId = url.substring(
//     url.lastIndexOf("/") + 1,
//     url.lastIndexOf(".")
//   );
//   return publicId;
// };

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

 export function getUrl(
  { fileName,
   bucketName,
   id,
   email,
   productTitle,
   dime = "600x600"}:ImageFireBase
 ) {
 

   if (fileName.indexOf(" ") !== -1) {
     fileName = fileName.replaceAll(" ", "%20");
   }

   let url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}.appspot.com/o/${email}%2F${productTitle}%2F${fileName}${id}_${dime}?alt=media`;

   if (url.indexOf(" ") !== -1) {
     url = url.replaceAll(" ", "%20");
   }
   if (url.indexOf("@") !== -1) {
     url = url.replaceAll(" ", " %40");
   }

   return url;
 }


 export const bucketName = "admin-gregory-shop"


 export function generateUrlsImage(
   imageUpload: File[],
   bucketName: string,
   email: string,
   productTitle: string,
   id: string,

   dime = "600x600"
 ) {
   const urls: ImageFireBase[] = [];

   Object.values(imageUpload).forEach((file: File) => {
     urls.push({
       bucketName,
       dime,
       email,
       fileName: file.name,
       id: id,
       productTitle,
     });
   });
   return urls
 }