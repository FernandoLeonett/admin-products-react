const Spinner = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 d-flex flex-column  justify-content-center align-items-center">
          <h1>⌛Cargando... </h1>
          <div
            className="spinner-grow spinner-grow-lg text-dark"
            role="status"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
