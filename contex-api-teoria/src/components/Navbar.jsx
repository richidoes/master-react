import React from 'react'
import {ThemeContext} from '../context/ThemeProvider'


const Navbar = () => {

    const {theme, cambioColor} = React.useContext(ThemeContext)

    return (
        <div style={{
            background: theme.background,
            color: theme.color
        }}>
            <h1>Navbar</h1>

            <label>Color texto</label>
            <input type="color"
            onChange={e => cambioColor({...theme, color: e.target.value /*hacemos una copia del theme y modificamos solo el valor que deseemos*/})}
            />
            
            <label>Color Fondo</label>
            <input type="color"
            onChange={e => cambioColor({...theme, background: e.target.value/*hacemos una copia del theme y modificamos solo el valor que deseemos*/})}
            />

        </div>
    )
}

export default Navbar
