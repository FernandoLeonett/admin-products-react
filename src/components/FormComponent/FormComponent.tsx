import { useEffect } from "react";
import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import Product from "../../interfaces/Product";

interface props {
  register: UseFormRegister<Product>;
  handleSubmit: UseFormHandleSubmit<Product>;
  onSubmit: any;
  errors: FieldErrorsImpl<Product>;
  products: Product[];
  title: string;
  isDirty: boolean;
  reset?: UseFormReset<Product>;
  modoEdit?: boolean
}

const FormComponent = ({
  handleSubmit,
  onSubmit,
  register,
  title,
  products,
  errors,
  isDirty,
  modoEdit = false

}: props) => {
  // useEffect(() => {
  //   return () => {
  //     reset();
  //   };
  // }, []);
  return (
    <div className="container-fluid">
      <div className="row form">
        <div className="col-xs-12 offset-md-3 col-md-6 my-2">
          <h2 className="border-title">{title}</h2>
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
              <p style={{ color: "red" }}>el titulo no debe contener caracteres especiales</p>
            )}
            {/* Category */}
            <div className="form-group">
              <label className="w-100">
                Categoría
                <input
                  list="category-list"
                  type="text"
                  {...register("category", {
                    required: "la categoria es requerida para agrupar tus productos"

                  })}
                  className="form-control"
                />
                <datalist id="category-list">
                  {products.map(({ category }, i) => (
                    <option key={i} value={category} />
                  ))}
                </datalist>
              </label>
              {errors?.category && (
                <p style={{ color: "red" }}>Categoría requerida</p>
              )}
            </div>

            {/* Descripción */}
            <div className="form-group">
              <label htmlFor="txtDescripcion">Descripción</label>
              <textarea className="form-control" rows={3}

                {...register("description")}

              ></textarea>


            </div>
            {/* Precio */}
            <div className="form-group">
              <label htmlFor="numPrecio">Precio:</label>
              <input
                type={"number"}


                {...register("price", {
                  required: "el precio es requerido",




                })}
                className="form-control"
              />
            </div>
            {errors?.price && (
              <p style={{ color: "red" }}>El precio debe ser un número</p>
            )}

            <input
              type="submit"
              className="btn btn-dark mb-3"
              value={modoEdit ? "Actualizar" : "Agregar"}
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty}

            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
