import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import setupWidget from "../../util/configWidget";
import myWidget from "../cloudinary/MyWidget";
import { deleteImage } from "../cloudinary/Service";
import Modal from "./Modal";

import { toast } from "react-toastify";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import ImageFireBase from "../../interfaces/ImageFIreBase";
import { deleteImageFireBase, updateProducts } from "../../firebase/services";

interface props {
  closeModal: () => void;
  isOpenModal: () => void;

  imgId: ImageFireBase;
  getValues: UseFormGetValues<Product>;
  setValue: UseFormSetValue<Product>;
}

export default function ReplaceImageModal({
  closeModal,
  isOpenModal,

  imgId,
  getValues,
  setValue,
}: props) {
  const {  setLoading, user } = useProducts();

  // let updateImageField = false;
  // const onLoadWidget = () => {
  //   setLoading(false);
  // };
  // const onSuccess = (result) => {
  //   updateImageField = true;
  //   const { secure_url } = result.info;
  //   setValue("image", [...getValues("image"), secure_url]);
  // };

  // const onCloseWidget = async (result) => {
  //   if (updateImageField) {
  //     updateImageField = false;
  //     console.log("onCloseWidget", "hubo cambios");

  //     await updateProducts(getValues("id"), {
  //       image: getValues("image"),
  //     });

  //     toast.success("✨ Imagen Actualizada", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }

  //   console.log("entro a close");
  // };

  // const replaceImg = async () => {
  //   setLoading(true);

  //   await deleteImage(imgId);
  //   const localImg = getValues("image").filter((i) => i !== imgId);
  //   setValue("image", localImg);
  //   myWidget(
  //     setupWidget(
  //       user.email,

  //       1,
  //       onSuccess,
  //       onCloseWidget,
  //       onLoadWidget
  //     )
  //   )

  //   closeModal();

  // };
  const deleteImageModal = async () => {

    setLoading(true);
    console.log('imgId', imgId)
    // const localImg = getValues("image").filter((i) => i !== imgId);
    // console.log("local", localImg);

    // await deleteImage(imgId);
    deleteImageFireBase(imgId.email,imgId.productTitle,imgId.fileName, imgId.id, imgId.dime)
    const localImg = getValues("image").filter((i:ImageFireBase) => i.id !== imgId.id);
    updateProducts({
    image:localImg,
    },
      getValues("id")
    );


    setLoading(false);
    // setValue("image", localImg);
    closeModal();
    toast.warn("🗑 Imagen Eliminada", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const cancelReplaceImage = () => {
    closeModal();
  };

  return (
    <Modal
      isOpenModal={isOpenModal}
      cancelFun={cancelReplaceImage}
      acceptFun={deleteImageModal}
      btnClassNameAccept={"btn btn-outline-danger"}
      btnClassNameCancel={"btn btn-outline-secondary"}
      title={"La imagen será eliminada"}
      question={"Confirme que  desea eliminar la imagen de forma permanente"}
      acceptValue={"Eliminar imagen"}

    // extraButton={
    //   <input
    //     className={"btn btn-outline-danger"}
    //     type="button"
    //     onClick={replaceImg}
    //     value={"Remplazar imagen"}
    //   />}

    />
  );
}
