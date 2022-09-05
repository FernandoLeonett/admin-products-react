export const getPublicIdFromPath = (path: string) => {
  const separateBySlash = path.split("/");
  const publicId = separateBySlash[1] + "/" + separateBySlash[2];

  return publicId;
};
export const MAX_FILES: number = 4;
export const MAX_FILE_SIZE = 4 * 1024 * 1024;
export const CLOUD_NAME = "fernandoleonett";
export const FOLDER_IMAGE = "fernnandoleonett@gmai.com";
export const API_KEY = "258197547193753";
export const UPLOAD_PRESET = `fernando_preset`;
export const API_SECRET = "exDjsoiPokHoXoVkMT2tfQ4c_g8";
export const getPublicIdImage = (url: string) => {
  const arr = url.split("/");
  const last = arr[arr.length - 1];

  const pid = last.split(".")[0];
  return pid;
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
