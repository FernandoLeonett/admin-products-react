import { useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/context";
import routes from "../../routers/routes";
import "./Header.css";

const Header = () => {
  const { logout, user } = useProducts();

  const navigate = useNavigate();
  const location = useLocation();

  const navigateBetwenHomeForm = () =>
    location.pathname == routes.home
      ? navigate(routes.form)
      : navigate(routes.home);

  return (
    <header>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <div>
          <a className="navbar-brand">
            <img src="/logo.png" className="rounded-circle" />
          </a>
        </div>
        {user && (
          <>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    style={{
                      cursor: "pointer",
                    }}
                    // onClick={() => logout()}
                    className="nav-link"
                    // id="btnCerrarSesion"
                  >
                    Descargar Aplicación
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    onClick={navigateBetwenHomeForm}
                    className="nav-link"
                    id="btnTop"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {location.pathname == routes.home
                      ? "Agregar Producto"
                      : "Ver listado"}
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => logout()}
                    className="nav-link"
                    id="btnCerrarSesion"
                  >
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
