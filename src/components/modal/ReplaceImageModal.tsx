import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import setupWidget from "../../util/configWidget";
import myWidget from "../cloudinary/MyWidget";
import { deleteImage } from "../cloudinary/Service";
import Modal from "./Modal";

import { toast } from "react-toastify";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface props {
  closeModal: () => void;
  isOpenModal: () => void;

  imgId: string;
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
  const { updateProducts, setLoading, user } = useProducts();

  let updateImageField = false;
  const onLoadWidget = () => {
    setLoading(false);
  };
  const onSuccess = (result) => {
    updateImageField = true;
    const { public_id } = result.info;
    setValue("image", [...getValues("image"), public_id]);
  };


  const onCloseWidget = async (result) => {
    if (updateImageField) {
      updateImageField = false;
      console.log("onCloseWidget", "hubo cambios");

      await updateProducts(getValues("id"), {
        image: getValues("image"),
      });

      toast.success("✨ Imagen Actualizada", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    console.log("entro a close");
  };

  const replaceImg = async () => {
    setLoading(true);

    await deleteImage(imgId);
    const localImg = getValues("image").filter((i) => i !== imgId);
    setValue("image", localImg);
    myWidget(
      setupWidget(
        user.email,
        getValues("title"),
        1,
        onSuccess,
        onCloseWidget,
        onLoadWidget
      )
    )

    closeModal();


  };
  const deleteImageModal = async () => {
    closeModal();
    setLoading(true);
    const localImg = getValues("image").filter((i) => i !== imgId);
    await deleteImage(imgId);

    updateProducts(
      getValues("id"),

      {
        image: localImg,
      }
    );
    setValue("image", localImg);

    setLoading(false);

    toast.warn("✨ Imagen Eliminada", {
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
      acceptFun={replaceImg}
      btnClassNameCancel={"btn btn-outline-secondary"}
      title={"Editar Imagen"}
      question={"Elija la opción que desea"}
      acceptValue={"Reemplazar imagen"}
      extraButton={
        <input
          className={"btn btn-outline-danger"}
          type="button"
          onClick={deleteImageModal}
          value={"Eliminar imagen"}
        />
      }
    />
  );
}
