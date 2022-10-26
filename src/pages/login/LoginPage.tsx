import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useProducts } from "../../context/context";
import routes from "../../routers/routes";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { validateEmail } from "../../util/util";
import {
  atraparInicioSesion,
  enviarEnlaceLogin,
  getUserByEmail,
} from "../../firebase/services";

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


    try {
      const ok = await getUserByEmail(email);
      if(!ok){
        throw new Error("usuario no registrado");
      }
      enviarEnlaceLogin(email);
      window.localStorage.setItem("correo", email);
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
    } catch (res) {
      // if (!res) {
        console.log(res);
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
      // }
    }
  };

   useEffect(() => {
     //correr funcion que atrape el inicio de sesión
     atraparInicioSesion(window.location.href);
   }, []);

  return (
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-xs-12 offset-md-3 col-md-6 offset-md-3">
          <form className="logIn" onSubmit={handleSubmit}>
            {/* <div className="row encabezadoLogin">
              <img src="/logo.png" className="col-xs-12 rounded-circle" />
            </div> */}
            <div className="form-group">
              <label htmlFor="txtEmail" className="mb-3">Correo electrónico</label>
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
                  ? "⌛Enviando..."
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
