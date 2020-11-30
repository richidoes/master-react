import React from 'react'
import { HolaContext } from '../context/HolaProvider'
import {ThemeContext} from '../context/ThemeProvider'

const Principal = () => {

    const {theme} = React.useContext(ThemeContext)
    const {hola} = React.useContext(HolaContext)


    return (
        <div style={{
            background: theme.background,
            color: theme.color
        }}>
           <h1> {hola} este es el contenido principal</h1> 
        </div>
    )
}

export default Principal
