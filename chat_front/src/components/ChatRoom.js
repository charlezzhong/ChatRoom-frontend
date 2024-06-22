import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
//import './ChatRoom.css';

const socket = io('http://localhost:3000');

const ChatRoom = ({ room }) => {
    const [username, setUsername] = useState('');
    const [roomMessages, setRoomMessages] = useState({});
    const [newMessage, setNewMessage] = useState('');

    // Prompt for username when component mounts
    useEffect(() => {
        const name = prompt('Please enter your name:');
        setUsername(name);
    }, []);

    // Join the room and set up message listener
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

    // Send a new message
    const sendMessage = () => {
        if (newMessage.trim() && username) {
            const message = { roomId: room.id, text: newMessage, sender: username };
            socket.emit('message', message);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-room">
            <h2>{room.name}</h2>
            <div className="messages">
                {(roomMessages[room.id] || []).map((message, index) => (
                    <div key={index} className="message">
                        <strong>{message.sender}: </strong> {/* Display sender's name */}
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