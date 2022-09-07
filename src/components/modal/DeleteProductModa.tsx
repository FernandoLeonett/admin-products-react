import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/context";
import useModal from "../../hooks/useModal";
import ModalProps from "../../interfaces/ModalProps";
import Product from "../../interfaces/Product";
import routes from "../../routers/routes";
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
      acceptValue={"Eliminar Producto"}
      question={"Confirme que  desea eliminar el producto de forma permanente"}
    />
    // </div>
  );
}
