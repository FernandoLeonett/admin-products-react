import { useEffect } from "react";
import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import { Path, PathValue, useForm } from "react-hook-form";
import "./Form.css";
import { WidgetLoader } from "../../components/cloudinary";
import { MAX_FILES } from "../../util/util";
import myWidget from "../../components/cloudinary/MyWidget";
import useModal from "../../hooks/useModal";

import ModalAdd from "../../components/modal/AddModal";
import setupWidget from "../../util/configWidget";
import Spinner from "../../components/spinner/Spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import FormAdd from "../../components/FormComponent/FormAdd";

const FormPage = () => {
  const { loading } = useProducts();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    setValue,
  } = useForm<Product>({
    // resolver: resolver,
    defaultValues: {
      title: "",
      boost: false,
      category: "",
      description: "",
      image: [],
    },
  });

  const isDirty = !!Object.keys(dirtyFields).length;

  const [isOpenModal, openModal, closeModal] = useModal(false);

  return (
    <>
      {!loading ? (
        <>
          <ModalAdd
            isOpenModal={isOpenModal}
            closeModal={closeModal}
            reset={reset}
          />

          {isDirty && <WidgetLoader />}
          <FormAdd
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            isDirty={isDirty}
            reset={reset}
            getValues={getValues}
            openModal={openModal}
            setValue={setValue}
          />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default FormPage;
