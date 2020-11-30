import React from 'react'
import { auth } from '../firebase'
import {withRouter} from 'react-router-dom';
import Firestore from './Firestore';

const Admin = (props) => {

    const [user,setUser] = React.useState(null)


    React.useEffect(() => {
        //validate user existence
        if (auth.currentUser) {
            console.log('existe un usuario')
            setUser(auth.currentUser)
        }else{
            console.log('no existe el usuario')
            props.history.push('/login')
        }
    },[props.history])//required , the callback read it and process the data

    return (
        <div>
            <h2>Ruta protegida</h2>
            {//if user exist 
                user && (
                    //print
                    <Firestore user={user}/>
                )
            }
        </div>
    )
}

export default withRouter(Admin)
