import { useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
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
    getValues: UseFormGetValues<Product>;
    setValue: UseFormSetValue<Product>;
}

export default function ModalAdd({
    closeModal,
    isOpenModal,
    reset,
    setValue,
    getValues
}: props) {
    const { updateProducts } = useProducts();

    const navigate = useNavigate();
    const continueAdding = () => {
        const { image, id, ...rest } = getValues();

        reset();
        updateProducts(id, { ...rest });
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
