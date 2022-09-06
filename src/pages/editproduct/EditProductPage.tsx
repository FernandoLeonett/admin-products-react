import { Fragment, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import { Image } from "cloudinary-react";
import "./Edit.css";
import { CLOUD_NAME } from "../../util/util";
import myWidget from "../../components/cloudinary/MyWidget";


import { useForm } from "react-hook-form";
import routes from "../../routers/routes";
import ReplaceImageModal from "../../components/modal/ReplaceImageModal";
import useModal from "../../hooks/useModal";
import { WidgetLoader } from "../../components/cloudinary";
import Spinner from "../../components/spinner/Spinner";
import FormComponent from "../../components/FormComponent/FormComponent";
import setupWidget from "../../util/configWidget";
import { toast } from "react-toastify";

interface ParamProduct {
  state: { product: Product };
}

const EditPage = () => {
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const param = useLocation() as ParamProduct;
  if (!param.state) {
    return <Navigate to={routes.home} />;
  }

  const { updateProducts, products, loading, setLoading, user } = useProducts();
  const [imageMode, setImageMode] = useState(false);

  const [updateImg, setUpdateimg] = useState(false)
  const onloadWidget = () => {
    setLoading(false);
  };
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, dirtyFields },

    setValue,
  } = useForm<Product>({
    defaultValues: param.state.product,
  });
  const onSuccess = (result) => {

    console.log('true', true)

    const { public_id } = result.info;

    setValue("image", [...getValues("image"), public_id]);

  };

  const oncloseWdiget = async (result) => {
    if (updateImg) {

      console.log("oncloseWdiget", "hubo cambios")

      await updateProducts(getValues('id'),
        {
          image: getValues('image'),
        })

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
    setUpdateimg(false)
    console.log("entro a close")
  };

  const addImageEdit = () => {
    setLoading(true);
    myWidget(
      setupWidget(
        user.email,
        getValues("title"),
        4 - getValues("image").length,
        onSuccess,
        oncloseWdiget,
        onloadWidget
      )
    );

  }







  const onSubmit = async () => {
    if (!isDirty) return;

    await updateProducts(
      getValues("id"),

      getValues()
    );
    setImageMode(true);
  };

  const isDirty = !!Object.keys(dirtyFields).length;

  // const { boost, category, description, image, price, title, id } = formProduct;



  useEffect(() => {

    setImageMode(true)





  }, [getValues('image').length])


  useEffect(() => {
    return () => (param.state = null);
  }, []);



  // useEffect(() => {

  // }, [getValues("image").length])


  return (
    <>
      {!imageMode ? (
        <FormComponent
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          title={"Editar Producto"}
          products={products}
          errors={errors}
          isDirty={isDirty}
          modoEdit={true}
        />
      ) : (
        <>
          <WidgetLoader />

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
                <p>Actualiza tus imagenes</p>
                <input disabled={getValues('image').length >= 4} onClick={addImageEdit} type="button" value="Agregar Imagenes" />
                <div className="row d-flex justify-content-center">

                  <div className="col-xs-12   text-center pb-3">
                    {Boolean(getValues("image").length) ? (
                      getValues("image").map((i, k) => (
                        <Fragment key={k}>
                          <Image
                            onClick={openModal}
                            publicId={i}
                            cloudName={CLOUD_NAME}
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
                            imgId={i}
                            getValues={getValues}
                            setValue={setValue}
                          />
                        </Fragment>
                      ))
                    ) : (
                      <h3>Este producto no tiene fotos aún 📷</h3>
                    )}
                  </div>
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
