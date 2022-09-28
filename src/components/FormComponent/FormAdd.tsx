import { useEffect } from "react";
import {
  FieldErrorsImpl,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import setupWidget from "../../util/configWidget";
import { MAX_FILES } from "../../util/util";
import myWidget from "../cloudinary/MyWidget";

interface props {
  register: UseFormRegister<Product>;
  handleSubmit: UseFormHandleSubmit<Product>;
  errors: FieldErrorsImpl<Product>;
  isDirty: boolean;
  reset?: UseFormReset<Product>;
  getValues: UseFormGetValues<Product>;
  openModal: () => void;
  setValue: UseFormSetValue<Product>;
  watch: UseFormWatch<Product>;
}

const FormAdd = ({
  handleSubmit,
  getValues,
  register,
  errors,
  isDirty,
  openModal,
  setValue,
  watch,
}: props) => {
  const { createProduct, products, loading, setLoading, user } = useProducts();
  const showCategory = watch("hasCategory", false);

  const oncloseWdiget = (result) => {
    if (Boolean(getValues("image").length)) {
      const product: Product = {
        title: getValues("title"),
        description: getValues("description"),
        image: getValues("image"),
        boost: getValues("boost"),
        price: getValues("price"),
        category: getValues("category"),
      };
      createProduct(product);
      openModal();
    } else {
      Swal.fire({
        text: "El producto debe tener al menos una imagen",
        icon: "error",
        confirmButtonText: "OK",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-dark",
        },
      });
    }
  };

  const onSuccess = (result) => {
    console.log("success");
    console.log("M", getValues());
    const { secure_url } = result.info;
    setValue("image", [...getValues("image"), secure_url]);
  };

  const onloadWdiget = () => {
    setLoading(false);
  };

  const onSubmit = () => {
    if (!isDirty) return;
    if (products.find((p) => p.title.trim() === getValues("title").trim())) {
      toast.error("Ya tienes un producto con este título!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    console.log("onSubmit", getValues());
    setLoading(true);
    myWidget(
      setupWidget(user.email, MAX_FILES, onSuccess, oncloseWdiget, onloadWdiget)
    );
  };

  return (
    <div className="container-fluid">
      <div className="row form">
        <div className="col-xs-12 offset-md-3 col-md-6 my-2">
          <h2 className="border-title">Agregar Producto</h2>
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
                    {...register("hasCategory")}
                  />
                  <label
                    style={{
                      cursor: "pointer",
                    }}
                    className="form-check-label"
                    // htmlFor="flexCheckIndeterminate"
                  >
                    Agregar Categoría
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
                <p style={{ fontSize: "12px", color: "#ccc" }}>
                  *Si no tienes categorías puedes poner "Todos"
                </p>
                {errors?.category && (
                  <p style={{ color: "red" }}>Categoría requerida.</p>
                )}
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
              value={"Agregar"}
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAdd;
