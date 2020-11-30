import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actualizarUsuarioAccion, editarFotoAccion } from "../redux/usuarioDucks";

const Perfil = () => {

  const usuario = useSelector(store => store.usuario.user);
  const loading = useSelector(store => store.usuario.loading)

    const [nombreUsuario, setNombreUsuario] = React.useState(usuario.displayName)
    const [activarForm, setActivarForm] = React.useState(false)
    const [error, setError] = useState(false)
    
    const dispatch = useDispatch()

    const actualizarUsuario = () => {

        if (!nombreUsuario.trim()) {
            console.log('Nombre vacio')
            return
        }

        dispatch(actualizarUsuarioAccion(nombreUsuario))
        setActivarForm(false)
    }

    const seleccionarArchivo = imagen => {

        const imagenCliente = imagen.target.files[0]
        //console.log(imagen.target.files[0])

        if (imagenCliente === undefined) {

            console.log('No se selecciono imagen')
            return
        }
        if (imagenCliente.type === "image/png" || imagenCliente.type === "image/jpg" || imagenCliente.type === "image/jpeg") {

            dispatch(editarFotoAccion(imagenCliente) )
            setError(false)

        } else{

            setError(true)

        }
    }

  return (
    <div className="mt-5 text-center">
      <div className="card-body">
        <div className="card-body">
          <img
            src={usuario.photoURL}
            alt=""
            width="100px"
            className="img-fluid"
          />
          <h5 className="card-title">Nombre: {usuario.displayName}</h5>
          <p className="card-text">Email: {usuario.email}</p>
          <button className="btn btn-warning"
          onClick={() => setActivarForm(true) }
          >
            Editar Nombre
          </button>

          {
              error &&
              <div className="alert alert-danger mt-2">
                Solo archivos png o jpg porfavor...
              </div>
          }
          
          <div className="custom-file">
                <input 
                type="file" 
                className="custom-file-input" 
                id="inputGroupFile01"
                style={{display: 'none'}}
                onChange={e => seleccionarArchivo(e) }
                disabled={loading}
                 />
                <label 
                className={loading ? "btn btn-info mt-2 disabled" : "btn btn-info mt-2"} 
                htmlFor="inputGroupFile01"
                >
                    Actualizar imagen
                </label>
          </div>

          {
            loading &&
            <div className="card-body">
                <div className="spinner-border text-success" role="status" />
                <span className="sr-only">Loading...</span>
            </div>

          }

          {
            activarForm ? (
                <div className="card-body">
            <div className="row justify-content-center">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={nombreUsuario}
                  onChange={e => setNombreUsuario(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => actualizarUsuario() }
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
          </div>
            ) : null

          }
          
        </div>
      </div>
    </div>
  );
};

export default Perfil;
