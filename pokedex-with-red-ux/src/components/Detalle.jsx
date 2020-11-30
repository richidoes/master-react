import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {pokeDetalleAccion} from '../redux/pokeDucks'

const Detalle = () => {

const dispatch = useDispatch()

React.useEffect(() => {

    const fetchData = () => {
        dispatch(pokeDetalleAccion())
    }

    fetchData()

}, [dispatch])

const pokemon = useSelector(store => store.pokemones.unPokemon)


    return pokemon ? (
        <div className="card mt-3 text-center">
            <div className="card-body">
            <img src={pokemon.foto} className="img-fluid" alt={pokemon.nombre}/>
                <div className="card-title text-uppercase">
                    {pokemon.nombre}
                </div>
                <p className="card-text">
                    Alto: {pokemon.alto} | Ancho: {pokemon.peso}
                </p>
            </div>
        </div>
    ) : null
}

export default Detalle
