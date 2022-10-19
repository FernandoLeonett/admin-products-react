import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/context";
import Product from "../../interfaces/Product";
import routes from "../../routers/routes";
import { Image } from "cloudinary-react";
import { CLOUD_NAME } from "../../util/util";
import { WidgetLoader } from "../cloudinary";
import DeLeteProductModal from "../modal/DeleteProductModa";
import useModal from "../../hooks/useModal";

interface props {
  product: Product;
}

const Card = ({ product }: props) => {
  const { title, description, price, image, category, boost } = product;
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [img, setImg] = useState(0);
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const changeImg = (n: number) => {
    if (img == 0 && n == -1) {
      setImg(() => product.image.length - 1);
      n = product.image.length - 1;
    } else if (img === product.image.length - 1 && n === 1) {
      setImg(() => 0);
    } else {
      setImg((prev) => prev + n);
    }
  };

  const goToEdit = (product: Product) => {
    navigate(routes.edit, {
      state: { product: product },
    });
  };
  const deletProductCard = (product: Product) => {
    openModal();
  };

  return (
    <>
      <DeLeteProductModal
        closeModal={closeModal}
        isOpenModal={isOpenModal}
        product={product}
      />
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card border-secondary ">
          {/* <div className="row no-gutters"> */}
          {/* <div style={{ height: 128 }}> */}
          <>
            {Boolean(product.image.length) ? (
              <Image
                publicId={image[img]}
                cloudName={CLOUD_NAME}
                className="card-img-top img-fluid"
                style={{
                  height: 128,
                  // width: "fit-content"
                  objectFit: "cover",
                  // objectPosition: "80%"

                  // aspectRatio: 7 / 9

                  // objectPosition: "center center",
                }}
              />
            ) : (
              <img
                src="/noImg.png"
                className="card-img-top img-fluid"
                style={{
                  height: 128,
                  objectFit: "cover",
                }}
              />
            )}
          </>
          {/* </div> */}
          <div className="card-body text-secondary">
            <h5 className="card-title" style={{ fontWeight: "bold" }}>
              {title}
            </h5>
            <p className="card-text mb-0">
              <small className="text-muted">$ {price}</small>
            </p>
            <p className="card-text mb-0">
              <small className="text-muted">{category}</small>
            </p>
            <p className="card-text mb-0">
              <small style={{ color: boost ? "#28a745" : "#dc3545" }}>
                {boost ? "Destacado" : "No destacado"}
              </small>
            </p>
            <p
              className="card-text mb-0"
              style={{
                height: 70,
                overflow: "auto",
              }}
            >
              {description}
            </p>
            <div className="d-flex flex-column ">
              <div className="btn-group mb-2">
                <button
                  onClick={() => goToEdit(product)}
                  type="button"
                  className="btn btn-sm btn-outline-success mt-0 col-xs-6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => deletProductCard(product)}
                  type="button"
                  className="btn btn-sm btn-outline-danger mt-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                  </svg>
                </button>
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className=" btn btn-sm btn-outline-dark mt-0"
                  onClick={() => changeImg(-1)}
                  disabled={!Boolean(product.image.length)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-left"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                  </svg>
                </button>
                <button
                  onClick={() => changeImg(1)}
                  type="button"
                  className="btn btn-sm btn-outline-dark mt-0"
                  disabled={!Boolean(product.image.length)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-right"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default memo(Card);
