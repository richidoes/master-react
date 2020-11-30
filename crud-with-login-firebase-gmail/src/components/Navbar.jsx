import React from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";

const Navbar = (props) => {

    //log out
    const cerrarSesion = () => {
        auth.signOut().then(() => {
            props.history.push("/login");
        });
    };

  return (
    <div className="navbar navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        Richard's, Inc.
      </Link>
      <div className="d-flex">
        <NavLink className="btn btn-primary mr-2" to="/" exact>
          Inicio
        </NavLink>

        {   //if user is loged authorise admin
            props.firebaseUser !== null ? (
            <NavLink className="btn btn-primary mr-2" to="/admin">
                Admin
            </NavLink>
            ) 
            : null //else
        }

        {   //if user is loged show logout button and hide login
            props.firebaseUser !== null ? (

            <button className="btn btn-primary" onClick={() => cerrarSesion()}>
                Cerrar sesión
            </button>
            ) : (
            //else show login and hide admin
            <NavLink className="btn btn-primary mr-2" to="/login">
                Login
            </NavLink>
            )
        
        }

      </div>
    </div>
  );
};

export default withRouter(Navbar);
