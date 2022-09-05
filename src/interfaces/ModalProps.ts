import { ReactNode } from "react";

export default interface ModalProps {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  children: ReactNode;
}
