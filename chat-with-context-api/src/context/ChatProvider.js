import React from "react";
import { db, auth, provider } from "../firebase";

export const ChatContext = React.createContext();

const ChatProvider = (props) => {
  const dataUsuario = { uid: null, email: null, estado: null };
  const [usuario, setUsuario] = React.useState(dataUsuario);
  const [mensajes, setMensajes] = React.useState([]);

  React.useEffect(() => {
    detectarUsurio();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detectarUsurio = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuario({ uid: user.uid, email: user.email, estado: true });
        cargarMensajes();
      } else {
        setUsuario({ uid: null, email: null, estado: false });
      }
    });
  };

  const ingresoUsuario = async () => {
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const cerrarSesion = () => {
    auth.signOut();
  };
  //detect the change in the chat
  const cargarMensajes = () => {
    db.collection("chat")
      .orderBy("fecha")
      //update in real time the array of message
      .onSnapshot((query) => {
        const arrayMensajes = query.docs.map((item) => item.data());
        setMensajes(arrayMensajes);
      });
  };
  //send message to db
  const agregarMensajes = async (uidChat, textoInput) => {
    try {
      await db.collection("chat").add({
        fecha: Date.now(),
        texto: textoInput,
        uid: uidChat,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        usuario,
        ingresoUsuario,
        cerrarSesion,
        mensajes,
        agregarMensajes,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
