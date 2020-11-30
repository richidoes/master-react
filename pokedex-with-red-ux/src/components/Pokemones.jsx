import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  obtenerPokemonesAccion,
  siguientePokemonAction,
  anteriorPokemonAccion, pokeDetalleAccion
} from "../redux/pokeDucks";
import Detalle from "./Detalle";

const Pokemones = () => {
  const dispatch = useDispatch();
  const pokemones = useSelector((store) => store.pokemones.results);
  const next = useSelector((store) => store.pokemones.next);
  const previous = useSelector((store) => store.pokemones.previous);

  React.useEffect(() => {

    const fetchData = () => {
        dispatch(obtenerPokemonesAccion())
    }

    fetchData()

}, [dispatch])

  return (
    <div className="row mt-3">
      <div className="col-md-6">

        <h3>Lista de pokemones</h3>
        
        <ul className="list-group mt-3">
          {pokemones.map((item, index) => (
            <li className="list-group-item" key={index}>
                {item.name}
                <button className="btn btn-info btn-sm float-right"
                onClick={() => dispatch(pokeDetalleAccion(item.url))}>
                    Info
                </button>
            </li>
            
          ))}
        </ul>

        <div className="d-flex justify-content-between mt-3">
            {
          //if empty
          pokemones.length === 0 && (
            <button
              className="btn btn-primary"
              onClick={() => dispatch(obtenerPokemonesAccion())}
            >
              Obtener Pokemones
            </button>
          )
        }
        {
          //if exist or is not null
          previous && (
            <button
              className="btn btn-warning"
              onClick={() => dispatch(anteriorPokemonAccion())}
            >
              Anterior
            </button>
          )
        }
        {
          //if exist or is not null
          next && (
            <button
              className="btn btn-success"
              onClick={() => dispatch(siguientePokemonAction())}
            >
              Siguientes
            </button>
          )
        }
        </div>
      </div>

      <div className="col-md-6">
          <h3>Detalle pokemon</h3>
          <Detalle />
      </div>
    </div>
  );
};

export default Pokemones;
