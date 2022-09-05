import { useEffect } from "react";
import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import { useForm } from "react-hook-form";
import "./Form.css";
import { WidgetLoader } from "../../components/cloudinary";
import { MAX_FILES } from "../../util/util";
import myWidget from "../../components/cloudinary/MyWidget";
import useModal from "../../hooks/useModal";

import ModalAdd from "../../components/modal/AddModal";
import setupWidget from "../../util/configWidget";
import Spinner from "../../components/spinner/Spinner";
import FormComponent from "../../components/FormComponent/FormComponent";
import { toast } from "react-toastify";

const FormPage = () => {
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

  const { createProduct, products, loading, setLoading, user } = useProducts();
  const oncloseWdiget = (result) => {

    if (result.event === "close" && getValues("image").length > 0) {
      console.log("info close", result.info);
      createProduct(getValues());
      openModal();
    } else {

      alert('no agregaste imagenes')
    }
  };

  const onSuccess = (result) => {
    console.log("success");
    const { public_id } = result.info;

    setValue("image", [...getValues("image"), public_id]);
  };

  const onloadWdiget = () => {
    setLoading(false);
  };

  const onSubmit = () => {
    if (!isDirty) return;
    setLoading(true);
    myWidget(
      setupWidget(
        user.email,
        getValues("title"),
        MAX_FILES,
        onSuccess,
        oncloseWdiget,
        onloadWdiget
      )
    );

  };



  return (
    <>
      {!loading ? (
        <>
          <ModalAdd
            isOpenModal={isOpenModal}
            closeModal={closeModal}
            reset={reset}
            getValues={getValues}
            setValue={setValue}
          />

          {isDirty && <WidgetLoader />}
          <FormComponent
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            title={"Agregar Producto"}
            products={products}
            errors={errors}
            isDirty={isDirty} reset={reset} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default FormPage;
