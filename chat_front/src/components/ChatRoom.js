// src/components/ChatRoom.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Change to your server URL

const ChatRoom = ({ room }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (room) {
            socket.emit('join', room.id);

            socket.on('message', message => {
                setMessages(prevMessages => [...prevMessages, message]);
            });

            return () => {
                socket.emit('leave', room.id);
                socket.off('message');
            };
        }
    }, [room]);

    const sendMessage = () => {
        if (newMessage.trim()) {
            socket.emit('message', { roomId: room.id, text: newMessage });
            setNewMessage('');
        }
    };

    return (
        <div className="chat-room">
            <h2>{room.name}</h2>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;