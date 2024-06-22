import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
//import './ChatRoom.css';

const socket = io('http://localhost:3000');

const ChatRoom = ({ room }) => {
    const [username, setUsername] = useState('');
    const [promptDisplayed, setPromptDisplayed] = useState(false);

    // Prompt for username only once when component mounts
    useEffect(() => {
        console.log(`current user is: ${username}`);
        console.log(`current promptDisplayed: ${promptDisplayed}`);
        if (!promptDisplayed) {
            const name = prompt('Please enter your name:');
            if (name) {
                setUsername(name);
                setPromptDisplayed(true);
            }
        }
    }, []); // Only run this effect once when component mounts

    // Other state variables
    const [roomMessages, setRoomMessages] = useState({});
    const [newMessage, setNewMessage] = useState('');

    // Join the room and set up message listener
    useEffect(() => {
        if (username && room) {
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
    }, [username, room]); // Run this effect when username or room changes

    // Send a new message
    const sendMessage = () => {
        if (newMessage.trim() && username) {
            const message = { roomId: room.id, text: newMessage, sender: username };
            socket.emit('message', message);
            setNewMessage('');
        }
    };

    // Render component
    return (
        <div className="chat-room">
            {username && ( // Render chat room only if username is set
                <>
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
                </>
            )}
        </div>
    );
};

export default ChatRoom;