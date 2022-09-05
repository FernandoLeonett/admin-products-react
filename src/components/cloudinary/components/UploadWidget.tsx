import { MAX_FILE_SIZE } from "../../../util/util"
import myWidget from "../MyWidget"
import spanish from "../../../util/spanish"
import WidgetButton from "./WidgetButton"
import WidgetProps from "../../../interfaces/WidgetProps"

const UploadWidget = ({
  sources = [],
  sourceKeys = null,
  resourceType = 'auto',
  cloudName = null,
  uploadPreset,
  buttonText = null,
  style = null,
  widgetStyles = null,
  folder = null,
  cropping = true,
  generateSignatureUrl = null,
  onSuccess = null,
  onFailure = null,
  logging = true,
  customPublicId = null,
  eager = null,
  apiKey = null,
  accepts = 'application/json',
  contentType = 'application/json',
  withCredentials = true,
  use_filename = true,
  unique_filename = false,
  googleDriveClientId = null,
  multiple = false,
  buttonType = 'button',
  destroy = false,
  autoClose = true,
  maxFileSize = MAX_FILE_SIZE,
  max_files,
  language = "es",
  btnClassName,
  text = spanish,
  onCloseWidget,
  onloadWdiget
}: WidgetProps) => {
  // * put all new variables at the end
  const myWidgetFunction = () =>
    myWidget(
      {
        sources,

        resourceType,
        cloudName,
        uploadPreset,
        folder,
        cropping,
        generateSignatureUrl,
        onSuccess,
        onFailure,
        logging,
        customPublicId,
        eager,
        apiKey,
        accepts,
        contentType,
        withCredentials,
        use_filename,
        unique_filename,
        googleDriveClientId,
        multiple,
        widgetStyles,

        destroy,
        autoClose,
        maxFileSize,
        max_files,
        text,
        language,
        onCloseWidget,
        sourceKeys,
        onloadWdiget


      }
    )

  return (
    <WidgetButton
      myWidgetFunction={myWidgetFunction}
      buttonText={buttonText}
      buttonType={buttonType}
      style={style}

      btnClassName={btnClassName}
    />
  )
}

export default UploadWidget
