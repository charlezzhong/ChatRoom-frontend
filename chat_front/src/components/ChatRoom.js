// src/components/ChatRoom.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Change to your server URL

const ChatRoom = ({ room }) => {
    const [roomMessages, setRoomMessages] = useState({});
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (room) {
            socket.emit('join', room.id);

            socket.on('message', (message) => {
                setRoomMessages((prevMessages) => ({
                    ...prevMessages,
                    [message.roomId]: [...(prevMessages[message.roomId] || []), message]
                }));
            });

            return () => {
                socket.emit('leave', room.id);
                socket.off('message');
            };
        }
    }, [room]);

    const sendMessage = () => {
        if (newMessage.trim()) {
            const message = { roomId: room.id, text: newMessage, sender: 'Me' }; // Adding sender for demo purposes
            socket.emit('message', message);
            setRoomMessages((prevMessages) => ({
                ...prevMessages,
                [room.id]: [...(prevMessages[room.id] || []), message]
            }));
            setNewMessage('');
        }
    };

    return (
        <div className="chat-room">
            <h2>{room.name}</h2>
            <div className="messages">
                {(roomMessages[room.id] || []).map((message, index) => (
                    <div key={index} className="message">
                        <strong>{message.sender}: </strong>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;