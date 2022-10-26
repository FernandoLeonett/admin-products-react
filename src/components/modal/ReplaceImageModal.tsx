import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import setupWidget from "../../util/configWidget";
import myWidget from "../cloudinary/MyWidget";

import Modal from "./Modal";

import { toast } from "react-toastify";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

import { deletestring } from "../../firebase/services";

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
  const { setLoading, user, updateProducts, setProducts, products } = useProducts();

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

//  deletestring(imgId.email,imgId.productTitle,imgId.fileName, imgId.id, imgId.dime)
 deletestring(imgId, user.email, getValues("title"))
//  console.log("me han borrado")
    const localImg = getValues("image").filter((i:string) => i !== imgId);
    console.log("quedaron", localImg)
    updateProducts({
    image:localImg,
    },
      getValues("id")
    );
    // let pos = products.findIndex((p) => p.id === getValues("id"));
    // const  product = products.find((p) => p.id === getValues("id"));
    // product.image = localImg

    // const newList = [...products];

    // newList[pos] = { ...newList[pos], ...product };
    // console.log(product)

    // setProducts(newList);


    // setLoading(false);
    setValue("image", localImg);
    closeModal();
    toast.error("🗑 Imagen eliminada", {
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
    console.log("cancelando")
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
      question={"Confirme que desea eliminar la imagen de forma permanente"}
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
