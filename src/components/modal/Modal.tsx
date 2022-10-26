import React from "react";
import ReactDom from "react-dom";

interface ModalProps {
  cancelFun: () => void;
  acceptFun: () => void;
  isOpenModal: any;
  title?: string;
  question?: string;
  acceptValue?: string;
  cancelValue?: string;
  btnClassNameAccept?: string;
  btnClassNameCancel?: string;
  extraButton?: JSX.Element;
}

export default function Modal({
  cancelFun,
  acceptFun,
  isOpenModal,
  title = "El Producto ha sido agregado",
  question = "¿Desea continuar agregando?",
  acceptValue = "Aceptar",
  cancelValue = "Cancelar",
  btnClassNameAccept = "btn btn-outline-primary",
  btnClassNameCancel = "btn btn-outline-secondary",
  extraButton,
}: ModalProps) {
  if (!isOpenModal) return null;

  return ReactDom.createPortal(
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, .7)",
          zIndex: 1000,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#FFF",
          padding: "50px",
          zIndex: 1000,
        }}
        className="rounded"
      >
        <h5>{title}</h5>
        <p>{question}</p>

        {extraButton}
        <input
          className={btnClassNameAccept}
          type="button"
          value={acceptValue}
          onClick={acceptFun}
        />
        <input
          className={btnClassNameCancel}
          type="button"
          onClick={cancelFun}
          value={cancelValue}
        />
      </div>
    </>,
    document.getElementById("portal")
  );
}
