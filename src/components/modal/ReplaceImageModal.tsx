import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import setupWidget from "../../util/configWidget";
import myWidget from "../cloudinary/MyWidget";
import { deleteImage } from "../cloudinary/Service";
import Modal from "./Modal";

import { useState } from "react";
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
  const [updateImage, setupdateImage] = useState(false);

  const onloadWdiget = () => {
    setLoading(false);
  };

  const oncloseWidget = () => {
    if (updateImage) {
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
  };

  const onSuccess = (result) => {
    const { public_id } = result.info;
    const updateImgs = getValues("image").map((i) => {
      if (i === imgId) {
        return public_id;
      }

      return i;
    });
    setValue("image", updateImgs);

    updateProducts(getValues("id"), {
      image: updateImgs,
    });
    setupdateImage(true);
  };

  const replaceImg = async () => {
    setLoading(true);
    await deleteImage(imgId);

    myWidget(
      setupWidget(
        user.email,
        getValues("title"),
        1,
        onSuccess,
        oncloseWidget,
        onloadWdiget
      )
    );

    closeModal();

    toast.success("✨ Imagen remplazada", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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

    toast.success("✨ Imagen Eliminada", {
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
