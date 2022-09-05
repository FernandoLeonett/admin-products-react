import WidgetProps from "../../interfaces/WidgetProps";
import spanish from "../../util/spanish";
declare global {
    interface Window {
        cloudinary: any;
    }
}
// * put all new variables at the end
export const myWidget = ({
    sources,
    sourceKeys,
    resourceType,
    cloudName,
    uploadPreset,
    buttonText,
    style,
    widgetStyles,
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

    destroy,
    autoClose,
    maxFileSize,
    max_files,
    language,
    text,
    onCloseWidget,
    onloadWdiget,
}: WidgetProps) => {
    const widget =
        !!window.cloudinary &&
        window.cloudinary.createUploadWidget(
            {
                maxFileSize: maxFileSize,
                max_files: max_files,
                language: "es",
                text: spanish,
                showCompletedButton: true,
                multiple: multiple,
                singleUploadAutoClose: autoClose,
                showAdvancedOptions: true,
                showPoweredBy: false,
                styles: widgetStyles,
                googleDriveClientId: googleDriveClientId,
                sources: sources,
                ...(sourceKeys && sourceKeys),
                cloudName: cloudName,
                uploadPreset: uploadPreset,
                folder: folder,
                cropping: cropping,
                resourceType: resourceType,
                ...(generateSignatureUrl && { use_filename: use_filename }),
                ...(generateSignatureUrl && { eager: eager }),
                ...(generateSignatureUrl && { unique_filename: unique_filename }),
                ...(generateSignatureUrl && {}),
            },
            (error: any, result: { event: string; info: string }) => {
                if (!error && result) {
                    console.log('result.event', result.event)
                    if (result.event && result.event !== 'abort') {
                        onloadWdiget();
                    }

                    // console.log("max files", max_files)
                    if (result.event === "success") {
                        logging &&
                            console.log("Done! Here is the image info: ", result.info);
                        logging && console.log(result);
                        !!onSuccess && onSuccess(result);
                        destroy && widget.destroy();
                    } else if (result.event === "close") {
                        !!onCloseWidget && onCloseWidget(result);
                    }
                } else if (!!error) {
                    !!onFailure
                        ? onFailure({ error: error, result: result })
                        : logging && console.log({ error: error, result: result });
                    destroy && widget.destroy();
                } else if (!!resourceType && result.info === "shown") {
                    logging && console.log("setting resourceType");
                    // const input: HTMLInputElement = document.querySelector(
                    //     '.cloudinary_fileupload'
                    // )
                    // input.accept = `${resourceType}/*`
                } else {
                    logging && console.log(result);
                }
            }
        );
    widget.open();
};

export default myWidget;
