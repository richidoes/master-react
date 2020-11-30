import React from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import swal from "@sweetalert/with-react";

const Recover = (props) => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(null);

  const processData = (e) => {
    e.preventDefault();
    //if email empty
    if (!email.trim()) {
      console.log("Ingrese Email...");
      setError("Ingrese Email");
      return;
    }
    //else
    setError(null);

    recuperar();
  };

  const recuperar = React.useCallback(async () => {
    try {
      //send email with instructions to change password
      await auth.sendPasswordResetEmail(email);

      //if success, send client to login section
      props.history.push("/login");
      
      //success message
      console.log("correo enviado");
      swal("Correo enviado!", "Se envio un correo para reestablecer tu contraseña!", "success");

    } catch (error) {

      console.log(error);
      setError(error.message);
      swal("Lo siento", "Ocurrio un error al enviar el correo!", "error");
    
    }
  }, [email, props.history]); //data we need in recuperar

  return (
    <div className="mt-5">
      <h3 className="text-center">Reiniciar contraseña</h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-8 col-md-6 col-xl-4">
          <form onSubmit={processData}>
            {error && (
              <div
                className="alert alert-danger alert-dismissible"
                role="alert"
              >
                <strong>{error}</strong>
              </div>
            )}
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingrese un email  ej:  prueba@prueba.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button
              className="btn btn-success btn-lg btn-block mt-4"
              type="submit"
            >
              Reiniciar contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Recover);
