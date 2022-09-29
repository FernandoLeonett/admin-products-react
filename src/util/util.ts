import Product from "../interfaces/Product";

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
