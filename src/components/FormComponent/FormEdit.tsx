import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FieldErrorsImpl,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "react-toastify";
import { useProducts } from "../../context/context";
import useModal from "../../hooks/useModal";

import Product from "../../interfaces/Product";
import EditModal from "../modal/EditModal";

interface props {
  register: UseFormRegister<Product>;
  handleSubmit: UseFormHandleSubmit<Product>;
  errors: FieldErrorsImpl<Product>;
  products: Product[];
  getValues: UseFormGetValues<Product>;
  setImageMode: Dispatch<SetStateAction<boolean>>;
  watch: UseFormWatch<Product>;
  isDirty: boolean;
  defaultValue: Product;
}

const FormEdit = ({
  handleSubmit,
  isDirty,
  getValues,
  register,
  products,
  errors,
  setImageMode,
  watch,
  defaultValue,
}: props) => {

  const { updateProducts } = useProducts();
  const [showCategory, setShowCategory] = useState(false);
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const toggleEnabledInputCategory = () => {
    setShowCategory((prev) => !prev);
  };

  const goToImageMode = () => {
    if (isDirty) {
      openModal(); 
    }else {
      setImageMode(true);
    }
  };

  const onSubmit = (data: Product) => {
    console.log(data);
    setImageMode(true);
    const { title, description, boost, category, price, id } = data;
    updateProducts(
      {
        title,
        description,
        boost,
        category,
        price,
      },
      id
    );
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row form">
          <div className="col-xs-12 offset-md-3 col-md-6 my-2">
            <h2 className="border-title">Editar Producto</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex justify-content-between align-items-center  mb-3">
                {/* DESTACADO */}
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckIndeterminate"
                      {...register("boost")}
                    />
                    <label
                      style={{
                        cursor: "pointer",
                      }}
                      className="form-check-label"
                      htmlFor="flexCheckIndeterminate"
                    >
                      Destacar
                    </label>
                  </div>
                </div>
              </div>
              {/* Título */}
              <div className="form-group">
                <label htmlFor="txtTitulo">Título</label>
                <input
                  type="text"
                  // name="title"
                  className="form-control"
                  {...register("title", {
                    required: "el titulo es requerido",
                    // validate: (value) => !/[^a-zA-Z0-9\s\-\/]/.test(value),
                  })}
                />
              </div>
              {errors?.title && (
                <p style={{ color: "red" }}>
                  el titulo no debe contener caracteres especiales
                </p>
              )}
              {/* Category */}
              <div className="d-flex justify-content-between align-items-center  mb-3">
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      // id="flexCheckIndeterminate"
                      // {...register("hasCategory")}
                      onChange={toggleEnabledInputCategory}
                    />
                    <label
                      style={{
                        cursor: "pointer",
                      }}
                      className="form-check-label"
                      // htmlFor="flexCheckIndeterminate"
                    >
                      Editar Categoría
                    </label>
                  </div>
                </div>
              </div>
              {showCategory && (
                <div className="form-group">
                  <label className="w-100">
                    Categoría
                    <input
                      list="category-list"
                      type="text"
                      {...register("category")}
                      className="form-control"
                    />
                    <datalist id="category-list">
                      {products.map(({ category }, i) => (
                        <option key={i} value={category} />
                      ))}
                    </datalist>
                  </label>
                  {/* <p style={{ fontSize: "12px", color: "#ccc" }}>
                  *Si no tienes categorías puedes poner "Todos"
                </p> */}
                  {/* {errors?.category && (
                  <p style={{ color: "red" }}>Categoría requerida.</p>
                )} */}
                </div>
              )}
              {/* Descripción */}
              <div className="form-group">
                <label htmlFor="txtDescripcion">Descripción</label>
                <textarea
                  className="form-control"
                  rows={3}
                  {...register("description")}
                ></textarea>
              </div>
              {/* Precio */}
              <div className="form-group">
                <label htmlFor="numPrecio">Precio:</label>
                <input
                type={"number"}
                {...register("price", {
                  required: "el precio es requerido", valueAsNumber:true, min:1
                })}
                className="form-control"
              />
            </div>
            {errors?.price && (
              <p style={{ color: "red" }}>precio no válido</p>
            )}
              <div className="container-fluid">
                <div className="row mb-4 d-flex justify-content-sm-between">
                  <input
                    type="submit"
                    value={"Actualizar Datos"}
                    onClick={handleSubmit(onSubmit)}
                    disabled={!isDirty}
                    className="btn btn-dark col-12 col-sm-6 button-form-edit"
                  />
                  <input
                    type="button"
                    value={"Actualizar Imágenes"}
                    onClick={goToImageMode}
                    className="btn btn-dark col-12 col-sm-6 button-form-edit"
                    // disabled={!isDirty}
                  />
                </div>
              </div>
              {/* <p style={{ fontSize: "12px", color: "#ccc" }}>
              *Si solo deseas agregar, editar o eliminar fotos, puedes darle
              click al botón
            </p> */}
            </form>
          </div>
        </div>
      </div>
      <EditModal closeModal={closeModal} 
      isOpenModal={isOpenModal } 
      setImageMode={setImageMode}  
       />
    </>
  );
};

export default FormEdit;
