import { toast } from "react-toastify";
import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import Modal from "./Modal";

interface props {
  closeModal: () => void;
  isOpenModal: () => void;

  product: Product;
}

export default function DeLeteProductModal({
  closeModal,
  isOpenModal,

  product,
}: props) {
  const { deleteProduct } = useProducts();

  const deleteProductFn = () => {
    deleteProduct(product);
    toast.error("🗑 Producto eliminado", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const cancelFun = () => {
    closeModal();
  };

  return (
    // <div
    //   style={{
    //     position: "relative",
    //     zIndex: 1,
    //   }}
    //   onClick={() => console.log("clicked")}
    // >
    <Modal
      isOpenModal={isOpenModal}
      cancelFun={cancelFun}
      acceptFun={deleteProductFn}
      btnClassNameAccept={"btn btn-outline-danger"}
      btnClassNameCancel={"btn btn-outline-secondary"}
      title={"El producto será eliminado"}
      acceptValue={"Eliminar"}
      question={"Confirme que  desea eliminar el producto de forma permanente"}
    />
    // </div>
  );
}
