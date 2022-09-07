import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/context";
import routes from "../../routers/routes";
import "./Header.css";
declare global {
  interface Window {
    deferredPrompt: any;
  }
}

const Header = () => {
  const { logout, user } = useProducts();

  const navigate = useNavigate();
  const location = useLocation();

  const navigateBetwenHomeForm = () =>
    location.pathname == routes.home
      ? navigate(routes.form)
      : navigate(routes.home);


  const [isReadyForInstall, setIsReadyForInstall] = useState(false);
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <div>
          <a className="navbar-brand">
            <img src="/logo.png" className="rounded-circle" />
          </a>
        </div>

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

              {setIsReadyForInstall && <li className="nav-item">
                <a
                  onClick={downloadApp}
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
              }

              {user &&
                <>
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

                </>
              }
            </ul>
          </div>
        </>

      </nav>
    </header>
  );
};
export default Header;


