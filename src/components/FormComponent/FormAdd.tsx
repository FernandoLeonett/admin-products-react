
import { useEffect, useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject, getStorage, UploadResult } from "firebase/storage";

import { v4 } from "uuid";
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
import schema from "yup/lib/schema";
import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import setupWidget from "../../util/configWidget";
import { bucketName, generateUrlsImage, getUrl, MAX_FILES, validateAllType } from "../../util/util";
import myWidget from "../cloudinary/MyWidget";
import { saveData, uploadData } from "../../firebase/services";
import { getFirestore } from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";
import User from "../../interfaces/User";
import ImageFireBse from "../../interfaces/ImageFIreBase";

const storage = getStorage(firebaseApp);



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

  const [imageUpload, setImageUpload] = useState<File []>([]);
  // const [imageUrls, setImageUrls] = useState([]);
  const [localUrls, setLocalUrls] = useState([]);
  const cont = useRef(0)

  const id = v4()

 
  



 

  // const oncloseWdiget = (result) => {
  //   if (Boolean(getValues("image").length)) {
  //     const product: Product = {
  //       title: getValues("title"),
  //       description: getValues("description"),
  //       image: getValues("image"),
  //       boost: getValues("boost"),
  //       price: getValues("price"),
  //       category: getValues("category"),
  //     };
  //     createProduct(product);
  //     openModal();
  //   } else {
  //     Swal.fire({
  //       text: "El producto debe tener al menos una imagen",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //       buttonsStyling: false,
  //       customClass: {
  //         confirmButton: "btn btn-dark",
  //       },
  //     });
  //   }
  // };



  const onSuccess = (result) => {
    console.log("success");
    console.log("M", getValues());
    const { secure_url } = result.info;
    setValue("image", [...getValues("image"), secure_url]);
  };

  const onloadWdiget = () => {
    setLoading(false);
  };

  const onSubmit = async(data: Product) => {
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
      alert("debes seleccionar al menos una foto para el producto")
      return
    }

    if (imageUpload.length > 4) {
      alert("el producto puede tener hasta 4 imagenes")
      return
    }
    if (!validateAllType(Object.values(imageUpload))) {
      alert("Formato no permitido para una o varias imagenes")

      return
    }



    setLoading(true);
    uploadData(imageUpload,user.email,getValues("title"),id)
    setLocalUrls([])
    data.image = generateUrlsImage(imageUpload, bucketName, user.email, getValues("title"), id)
    console.log("data", data)
    await saveData(data)
    setLoading(false)
    openModal()

    




  
    




  };


  
  const fileHandler = (event) => {
    setImageUpload(event.target.files);
  }





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
          {localUrls.map((url, file) =>
            <img key={file} src={url} alt="esto no es una imagen valida" />
          )}
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


