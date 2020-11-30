import React from 'react'
import Form from './Form'

import { ChatContext } from "../context/ChatProvider";

const Chat = () => {

    const {mensajes, usuario} = React.useContext(ChatContext)
    const refZonaChat = React.useRef(null)

    React.useEffect(() => {
        //console.log(refZonaChat)

        //when detect new message or reload page, put the page in the bottom where the last message are.
        refZonaChat.current.scrollTop = refZonaChat.current.scrollHeight
    },[mensajes])

    return (
        <div className="mt-3 px-2"
         style={{
            height: '75vh', overflow: 'scroll'
         }}
         ref={refZonaChat}
        >
            {
                mensajes.map((item, index) => (

                    usuario.uid === item.uid ? (
                        <div className="d-flex justify-content-end mb-2" 
                        key={index}>
                            <span className="badge badge-pill badge-success">
                                {item.texto}
                            </span>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-start mb-2"
                        key={index}>
                            <span className="badge badge-pill badge-secondary">
                                {item.texto}
                            </span>
                        </div>
                    )
                ))
            }
            
            

            <Form />
        </div>
    )
}

export default Chat
