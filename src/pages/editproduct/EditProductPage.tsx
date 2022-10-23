import { Fragment, SetStateAction, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";

import "./Edit.css";
import {
  bucketName,
  CLOUD_NAME,
  generateUrlsImage,
  getUrl,
  validateAllType,
} from "../../util/util";
import myWidget from "../../components/cloudinary/MyWidget";
import { useForm } from "react-hook-form";
import routes from "../../routers/routes";
import ReplaceImageModal from "../../components/modal/ReplaceImageModal";
import useModal from "../../hooks/useModal";
import { WidgetLoader } from "../../components/cloudinary";
import Spinner from "../../components/spinner/Spinner";
import setupWidget from "../../util/configWidget";
import { toast } from "react-toastify";
import FormEdit from "../../components/FormComponent/FormEdit";
import { uploadData } from "../../firebase/services";
import { v4 } from "uuid";
import ImageFireBase from "../../interfaces/ImageFIreBase";

interface ParamProduct {
  state: { product: Product };
}

const EditPage = () => {
  const param = useLocation() as ParamProduct;
  if (!param.state) {
    return <Navigate to={routes.home} />;
  }
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const { products, loading, setLoading, user, updateProducts } = useProducts();
  const [imageMode, setImageMode] = useState(false);
  const [deleteimg, setDeleteimg] = useState<ImageFireBase>(null);
  const [updatedImage, setUpdatedImage] = useState(false);

  function deleteOneImage(file: ImageFireBase) {
    console.log(file);

    openModal();
    setDeleteimg(file);
  }

  const onLoadWidget = () => {
    setLoading(false);
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
    watch,
  } = useForm<Product>({
    defaultValues: param.state.product,
  });
  let updateImageField = false;

  const isDirty = !!Object.keys(dirtyFields).length;

  const onSuccess = (result) => {
    updateImageField = true;
    const { secure_url } = result.info;
    setValue("image", [...getValues("image"), secure_url]);
  };

  const onCloseWidget = async (result) => {
    if (updateImageField) {
      updateImageField = false;
      console.log("valores a actualizar", getValues());
      console.log("onCloseWidget", "hubo cambios");

      // await updateProducts(getValues("id"), {
      //   image: getValues("image"),
      // });

      toast.success("✨ Imagen Agregada", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    console.log("entro a close");
  };

  const addImageEdit = async (e) => {
    const files: File[] = e.target.files;
    console.log("files ", files.length);

    if (files.length > 4 - getValues("image").length) {
      alert("el producto puede tener hasta 4 imágenes");
      return;
    }
    if (!validateAllType(Object.values(files))) {
      alert("Formato no permitido para una o varias imagenes");

      return;
    }

    // uploadData(files, user.email, getValues("title"), id)

    // urls para firebase
    const urls: ImageFireBase[] = [];

    const currentImages = getValues("image");

    Object.values(files).forEach((file: File) => {
      const id = v4();
      console.log("id limpiado", id);
      urls.push({
        bucketName: bucketName,
        dime: "600x600",
        email: user.email,
        fileName: file.name,
        id: id,
        productTitle: getValues("title"),
      });

      uploadData(file, user.email, getValues("title"), id);
    });
    console.log("urls", urls);

    const updateImages = [...currentImages, ...urls];

    await updateProducts(
      {
        image: updateImages,
      },
      getValues("id")
    );

    setValue("image", updateImages);

    // const localImg = [...getValues("image")
    // myWidget(
    //   setupWidget(
    //     user.email,

    //     4 - getValues("image").length,
    //     onSuccess,
    //     onCloseWidget,
    //     onLoadWidget
    //   )
    // );
  };

  const errorImage = (e, k) => {
    // localStorage.setItem("flag", JSON.stringify("1"));
    e.target.src = "/optimizandoImagen.gif";
    console.log("error image")
  };

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("flag")) === "1") {
  //     setImageMode(true);
  //     localStorage.removeItem("flag");
  //   } else {
  //     setImageMode(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   setUpdatedImage(true)

  // }, [onSuccess])

  // const { boost, category, description, image, price, title, id } = formProduct;

  useEffect(() => {
    return () => setImageMode(false);
  }, []);

  useEffect(() => {
    return () => (param.state = null);
  }, []);

  // useEffect(() => {

  // }, [getValues("image").length])

  return (
    <>
      {!imageMode ? (
        <FormEdit
          handleSubmit={handleSubmit}
          register={register}
          products={products}
          errors={errors}
          getValues={getValues}
          setImageMode={setImageMode}
          watch={watch}
          isDirty={isDirty}
        />
      ) : (
        <>
          <>
            {loading ? (
              <Spinner />
            ) : (
              <div className="container">
                <h2 className="border-title">{getValues("title")}</h2>
                <div className="row">
                  <div
                    className="col-xs-12"
                    style={{ width: "-webkit-fill-available" }}
                  >
                    <table className="table table-hover ">
                      <tbody>
                        <tr>
                          <td className="td-estilos">Id:</td>
                          <td>{getValues("id")}</td>
                        </tr>
                        <tr>
                          <td className="td-estilos">Descripción</td>
                          <td>{getValues("description")}</td>
                        </tr>
                        <tr>
                          <td className="td-estilos">Categoría</td>
                          <td>{getValues("category")}</td>
                        </tr>
                        <tr>
                          <td className="td-estilos">Precio</td>
                          <td>{getValues("price")}</td>
                        </tr>
                        <tr>
                          <td className="td-estilos">Destacado</td>
                          <td
                            title={
                              getValues("boost") ? "destacado" : "sin destacar"
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {getValues("boost") ? "🟢" : "🔴"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="m-0" style={{ fontWeight: "bold" }}>
                  Actualiza tus imágenes
                </p>
                <p className="m-0" style={{ fontSize: 12, color: "#ccc" }}>
                  clickea sobre la imágen para ver más opciones
                </p>

                <input
                  // disabled={getValues("image").length >= 4}
                  accept="png, jpeg,  jpg, webp"
                  multiple
                  onChange={addImageEdit}
                  type="file"
                  className="btn btn-outline-secondary mb-3"
                  // value="Agregar Imágenes"
                />
                <div className="row d-flex justify-content-center">
                  <>
                    <div className="col-xs-12   text-center pb-3">
                      {Boolean(getValues("image").length) ? (
                        getValues("image").map((file, k) => (
                          <Fragment key={k}>
                            <img
                              alt={getValues("title")}
                              title={file.fileName}
                              src={getUrl(file)}
                              onClick={() => deleteOneImage(file)}
                              onError={(e) => errorImage(e, k)}
                              className="imagen-datos-producto"
                              style={{
                                height: "160px",
                                aspectRatio: "1",
                                padding: "0.5rem",
                                cursor: "pointer",
                              }}
                            />
                            <ReplaceImageModal
                              closeModal={closeModal}
                              isOpenModal={isOpenModal}
                              imgId={deleteimg}
                              getValues={getValues}
                              setValue={setValue}
                            />
                          </Fragment>
                        ))
                      ) : (
                        <h3>Este producto no tiene fotos aún 📷</h3>
                      )}
                    </div>
                  </>
                </div>
              </div>
            )}
          </>
        </>
      )}
    </>
  );
};

export default EditPage;
