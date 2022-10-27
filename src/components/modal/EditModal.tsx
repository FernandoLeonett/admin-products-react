import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

interface props {
  closeModal: () => void;
  isOpenModal: () => void;
  setImageMode: Dispatch<SetStateAction<boolean>>;

  // getValues: UseFormGetValues<Product>;
  // setValue: UseFormSetValue<Product>;
}

export default function EditModal({ closeModal, isOpenModal, setImageMode }: props) {
  const navigate = useNavigate();
  const descartarCambios = async () => {
    setImageMode(true);
    closeModal();
  };

  const seguirEditando = () => {
    closeModal();
  };

  return (
    <Modal
      isOpenModal={isOpenModal}
      cancelFun={descartarCambios}
      acceptFun={seguirEditando}
      title={"Tienes cambios sin guardar"}
      question={"¿Continuar sin guardar?"}
      acceptValue={"Seguir editando"}
      cancelValue={"Descartar cambios"}
    />
  );
}
