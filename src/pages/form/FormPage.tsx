import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import { useForm } from "react-hook-form";
import "./Form.css";



import useModal from "../../hooks/useModal";

import ModalAdd from "../../components/modal/AddModal";

import Spinner from "../../components/spinner/Spinner";
import FormAdd from "../../components/FormComponent/FormAdd";
import { yupResolver } from "@hookform/resolvers/yup";


const FormPage = () => {
  const { loading , user} = useProducts();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, dirtyFields ,isSubmitSuccessful},
    reset,
    setValue,
    watch,
    
  } = useForm<Product>({
    // resolver: resolver,
    defaultValues: {
      title: "",
      boost: false,
      category: "Otros",
      description: "",
      image: [],
      user:user.email
      
    }
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

     
          <FormAdd
            isSubmitSuccessful ={isSubmitSuccessful}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            isDirty={isDirty}
            reset={reset}
            getValues={getValues}
            openModal={openModal}
            setValue={setValue}
            watch={watch}
          />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default FormPage;
