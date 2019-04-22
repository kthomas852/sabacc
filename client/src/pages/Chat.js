import React, {useState, useEffect} from 'react';
// import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';

export default function Chat (){
const [message, setMessage] = useState("")
const [handle, setHanlde] = useState("")

// Make connection fo Sockets
const socket = io('http://localhost:3002');

// Emit events
function btnClick(){
    console.log("message sent")
    socket.emit('chat-message', {
        message: message,
        handle: handle
    });
    setMessage("");
}

useEffect(()=>{
    // Listener for events
    socket.on('server-message', function(data){
        console.log("Incoming data: " + JSON.stringify(data))
        let strong = document.createElement('strong')
        strong.setAttribute('style', '{style.outputStrong}')
        strong.append(data.handle)
        strong.append(': ')
        let p = document.createElement('p')
        p.append(strong)
        p.append(data.message)
        document.getElementById('output').append(p);
    });
 }, [])


    return(
        <div id="mario-chat" style={style.marioChat}>
            <h2 style={style.h2}>Players Chatroom</h2>
            <div id="chat-window" style={style.chatWindow}>
                <div id="output" style={style.output}></div>
            </div>
            <input id="handle" type="text" placeholder="Handle" style={style.input} onChange={(e)=>{setHanlde(e.target.value)}} value={handle}/>
            <input id="message" type="text" placeholder="Message" style={style.input} onChange={(e)=>{setMessage(e.target.value)}} value={message}/>
            <button id="send" onClick={btnClick} style={style.button}>Send</button>
        </div>
    )
}

const style = {
    
    h2: {
        fontSize: '18px',
        padding: '10px 20px',
        color: '#575ed8',
    },
    
    marioChat: {
        maxWidth: '600px',
        margin: '30px auto',
        border: '1px solid #ddd',
        boxShadow: '1px 3px 5px rgba(0,0,0,0.05)',
        borderRadius: '2px',
    },
    
    chatWindow: {
        height: '400px',
        overflow: 'auto',
        background: '#f9f9f9',
    },
    
    output: {
        padding: '14px 0px',
        margin: '0 20px',
        borderBottom: '1px solid #e9e9e9',
        color: '#555',
    },
    
    feedback: {
        color: '#aaa',
        padding: '14px 0px',
        margin: '0 20px',
    },
    
    outputStrong: {
        color: '#575ed8'
    },
    
    label: {
        boxSizing: 'border-box',
        display: 'block',
        padding: '10px 20px'
    },
    
    input: {
        padding: '10px 20px',
        boxSizing: 'border-box',
        border: '0',
        display: 'block',
        width: '100%',
        background: '#fff',
        borderBottom: '1px solid #eee',
        fontFamily: 'Nunito',
        fontSize: '16px',
    },
    
    button: {
        background: '#575ed8',
        color: '#fff',
        fontSize: '18px',
        border: '0',
        padding: '12px 0',
        width: '100%',
        borderRadius: '0 0 2px 2px'
    }
}