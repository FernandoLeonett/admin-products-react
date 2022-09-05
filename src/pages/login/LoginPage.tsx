import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../client/supabaase";
import { useProducts } from "../../context/context";
import routes from "../../routers/routes";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { validateEmail } from "../../util/util";

const Login = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const { loginWithMagicLink, loading } = useProducts();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("🗑 Email no valido", {
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
    const res = await loginWithMagicLink(email);

    if (!res) {
      toast.error(
        "No se encuentra el registro, contáctese con el administrador",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      return;
    }

    setSending(true);
    Swal.fire({
      text: "Mail enviado correctamente, verifica tu casilla de correo 📧",
      icon: "success",
      confirmButtonText: "OK",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-dark",
      },
    });
    console.log(email);
  };

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((event, session) => {
  //     console.log(event, session);
  //     if (session) navigate(routes.home);
  //   });
  // }, []);

  return (
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-xs-12 offset-md-3 col-md-6 offset-md-3">
          <form className="logIn" onSubmit={handleSubmit}>
            <div className="row encabezadoLogin">
              <img src="/logo.png" className="col-xs-12 rounded-circle" />
            </div>
            <div className="form-group">
              <label htmlFor="txtEmail">Correo</label>
              <input
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                // id="txtEmail"
                disabled={loading || sending}
                placeholder="tucorreo@tudominio.com"
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="txtPassword">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="txtPassword"
                placeholder="n digitos"
              />
            </div> */}
            {/* <button type="submit" id="iniciarSesion" className="btn btn-dark">
            
            </button> */}

            <button
              className="btn btn-dark"
              type="submit"
              disabled={loading || sending}
            >
              <span
                className={`${
                  loading && "spinner"
                }  spinner-border-sm" role="status" aria-hidden="true`}
              >
                {loading
                  ? "Cargando"
                  : sending
                  ? "Se ha enviado un enlace al correo que ingresaste"
                  : "Escribe tu email "}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

// Swal.fire({
//   text: "Ocurrió un error 😬 vuelve a intentarlo o contáctanos",
//   icon: "error",
//   confirmButtonText: "OK",
//   buttonsStyling: false,
//   customClass: {
//     confirmButton: "btn btn-dark",
//   },
// });

// toast.success("✨ Producto agregado", {
//   position: "top-center",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// });

// toast.error("🗑 Producto eliminado", {
//   position: "top-center",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// });
