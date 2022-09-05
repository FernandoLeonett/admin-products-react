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

    reset: any;
    product: Product;
}

export default function ModalAdd({
    closeModal,
    isOpenModal,
    reset,
    product,
}: props) {
    const { updateProducts } = useProducts();

    const navigate = useNavigate();
    const continueAdding = () => {
        const { image, ...rest } = product;

        reset();
        updateProducts(product.id.toString(), { ...rest });
        closeModal();
    };

    const cancelAdding = () => {
        closeModal();
        navigate(routes.home);
    };

    return (

        <Modal
            isOpenModal={isOpenModal}
            cancelFun={cancelAdding}
            acceptFun={continueAdding}
            acceptValue={"Seguir Agregando"}
            cancelValue={"Ir a la lista"}
        />

    );
}
