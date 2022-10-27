import { useEffect, useRef, useState } from "react";
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
import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import {
  bucketName,
  generateUrlsImage,
  validateAllType,
} from "../../util/util";

import "./FormComponent.css";

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
  const [imageUpload, setImageUpload] = useState<File[]>([]);
  const [showCategory, setShowCategory] = useState(false);
  const [localUrls, setLocalUrls] = useState([]);
  const cont = useRef(0);

 const toggleEnabledInputCategory = () => {
   setShowCategory((prev) => !prev);
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

  const onSubmit = async (data: Product) => {
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

    if (imageUpload.length === 0) {
      toast.warn("El producto debe tener al menos una foto", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (imageUpload.length > 4) {
      toast.warn("El producto puede tener hasta cuatro imágenes", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!validateAllType(Object.values(imageUpload))) {
      toast.warn("Formato no permitido para una o varias imágenes", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    const urls = generateUrlsImage(imageUpload,bucketName,user.email,getValues("title"));
    setLocalUrls([]);
    data.image = urls;
    console.log("data", data);

    createProduct(data, user.email);

    openModal();
  };

  const fileHandler = (event) => {
    setImageUpload(event.target.files);
  };

  useEffect(() => {
    function onChangeInputFIle() {
      Object.values(imageUpload).forEach((file) => {
        if (file == null) return;

        setLocalUrls((prev) => [...prev, URL.createObjectURL(file)]);
      });
    }
    onChangeInputFIle();
  }, [imageUpload]);

  return (
    <div className="container-fluid">
      <div className="row form">
        <div className="col-xs-12 offset-md-3 col-md-6 my-2">
          <h2 className="border-title">Agregar Producto</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* IMAGEN  */}
            <div className="form-group">
              <input
                type="file"
                accept="png, jpeg,  jpg, webp"
                multiple
                className="caja-input"
                onChange={fileHandler}
              />
              {/* {errors?.image && <p style={{ color: "red" }}>{errors?.image.message}</p>} */}
            </div>

            <div className="container">
              <div className="row d-flex justify-content-around">
                {localUrls.length > 0 ? (
                  localUrls.map((i, k) => (
                    <img
                      src={i}
                      alt={""}
                      key={k}
                      className="col-sm-6 col-md-3 p-1 bg-light img-form"
                    />
                  ))
                ) : (
                  <h6>Este producto no tiene fotos aún 📷</h6>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center  mt-2 mb-3">
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
                el título no debe contener caracteres especiales
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
                    {products.map(({ category }, file) => (
                      <option key={file} value={category} />
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
            {/* STOCK */}
            {/* <div className="form-group">
              <label htmlFor="numCopia">Stock</label>
              <input
                type="number"
                name="copias"
                id="numCopia"
                required
                min="1"
                className="form-control"
              />
            </div> */}
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
