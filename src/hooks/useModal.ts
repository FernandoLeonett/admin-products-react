import { useState } from "react";

const useModal = (initialValue = false) => {
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(initialValue);

  const openModal: any = () => setIsOpenModal(true);

  const closeModal: any = () => setIsOpenModal(false);

  return [isOpenModal, openModal, closeModal];
};

export default useModal;
