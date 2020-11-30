import React from "react";
import { auth, db } from "../firebase";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [error, setError] = React.useState(null);
  const [esRegistro, setEsRegistro] = React.useState(false);

  const processData = (e) => {
    e.preventDefault();
    //if email empty
    if (!email.trim()) {
      console.log("Ingrese Email...");
      setError("Ingrese Email");
      return;
    }
    //if password empty
    if (!pass.trim()) {
      console.log("Ingrese Contraseña...");
      setError("Ingrese Contraseña");
      return;
    }
    //if short password
    if (pass.length < 6) {
      console.log("Contraseña mayor a 6 caracteres");
      setError("Contraseña de 6 caracteres o más");
      return;
    }
    //else
    setError(null);
    console.log("Todas las validaciones pasadas!");

    if (esRegistro) {
      registrarDb();
    } else {
      login();
    }
  };

  const login = React.useCallback(async () => {
    try {
      //request access with the data sended
      const res = await auth.signInWithEmailAndPassword(email, pass);
      console.log(res.user);

      //clear form
      setEmail("");
      setPass("");
      setError(null);

      //if data match with existing user, send client to admin section
      props.history.push("/admin");
    } catch (error) {
      console.log(error);

      if (error.code === "auth/invalid-email") {
        setError("Email no valido");
        return;
      }
      if (error.code === "auth/user-not-found") {
        setError("Email no registrado");
        return;
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
        return;
      }
    }
  }, [email, pass, props.history]); //required , the callback read it and process the data

  const registrarDb = React.useCallback(async () => {
    try {
      //request creation of user in db using the email and password credentials
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      console.log(res.user);

      //if not existe, create new collection in db using email and save params : email,uid
      await db.collection("usuarios").doc(res.user.email).set({
        email: res.user.email,
        uid: res.user.uid,
      });
      await db.collection(res.user.uid).add({
        name: 'Tarea de ejemplo',
        fecha: Date.now()
      })
      //clear form
      setEmail("");
      setPass("");
      setError(null);

      //if creation success, send client to admin section
      props.history.push("/admin");
    } catch (error) {
      console.log(error);

      if (error.code === "auth/invalid-email") {
        setError("Email no valido, requiere ej: ejemplo@ejemplo.com");
        return;
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Email ya utilizado");
      }
    }
  }, [email, pass, props.history]); //required , the callback read it and process the data

  return (
    <div className="mt-5">
      <h3 className="text-center">
        {esRegistro ? "Registro de usuarios" : "Login"}
      </h3>
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
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Ingrese la contraseña"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <button
              className="btn btn-success btn-lg btn-block mt-4"
              type="submit"
            >
              {esRegistro ? "Registrarse" : "Acceder"}
            </button>
            <button
              className="btn btn-primary btn-sm btn-block"
              onClick={() => setEsRegistro(!esRegistro)} //change the boolean value of esRegistro
              type="button"
            >
              {esRegistro ? "¿Ya estas registrado?" : "¿No tienes cuenta?"}
            </button>
            
            {
              !esRegistro ? (
                <button
                className="btn btn-warning btn-sm mt-2"
                type="button"
                onClick={() => props.history.push('/recover')}
                >
                ¿Olvidaste la contraseña?
                </button>
              ) : null
            }
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
