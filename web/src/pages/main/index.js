import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import uuid from 'uuid/dist/v4';

const socket = io('http://localhost:3001');

socket.on('connect', () => console.log('conectado!'));

const Main = () => {

    const myId = uuid();
    const [message, updateMessage] = useState('');
    const [messages, updateMessages] = useState([]);

    useEffect(() => {
        const handleNewMessage = newMessage =>  updateMessages ([...messages, newMessage]);
        socket.on('chat.message', (data) => {
            handleNewMessage(data);
        });
    }, [messages]);

    const handleInputChange = event => {
        updateMessage(event.target.value);
    }

    const handleInputSubmit = event => {
        event.preventDefault();
        if (message.trim()){
            socket.emit('chat.message', {
                id: myId,
                message
            });
            updateMessage('');
        }
    }

    return (
        <main className='container'>

            <ul>
                {
                    messages.map(m => (
                        <li key={m.id}>
                            <span>{m.message}</span>
                        </li>
                    ))
                }
            </ul>

            <form onSubmit={handleInputSubmit}>
                <input type='text' name='message' value={message} onChange={handleInputChange} />
                <button>enviar</button>
            </form>

        </main>
    )
}

export default Main;