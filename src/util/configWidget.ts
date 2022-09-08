import WidgetProps from "../interfaces/WidgetProps";
import spanish from "./spanish";
import { CLOUD_NAME, UPLOAD_PRESET, API_KEY } from "./util";

const setupWidget = (
  folderImage,

  maxFiles: number,
  onSuccess: (result) => void,
  oncloseWdiget: (result) => void,
  onloadWdiget: () => void
) => ({
  folder: `${folderImage}`,

  sources: [
    "local",
    "google_drive",
    "facebook",
    "instagram",
    "camera",
    "dropbox",
    "url",
    "image_search",
  ],
  cloudName: CLOUD_NAME,
  uploadPreset: UPLOAD_PRESET,
  apiKey: API_KEY,
  max_files: maxFiles,
  language: "es",
  text: spanish,

  // destroy: true,
  onSuccess: onSuccess,
  autoClose: false,
  onCloseWidget: oncloseWdiget,
  onloadWdiget,
});
export default setupWidget;
