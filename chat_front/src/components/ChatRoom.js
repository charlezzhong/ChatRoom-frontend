import React, { useState, useEffect } from 'react';
import socket from './socket'; // Import the socket instance
import './ChatRoom.css';

const ChatRoom = ({ room, username }) => {
    const [roomMessages, setRoomMessages] = useState({});
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (username && room) {
            console.log("Joining room:", room.id);
            socket.emit('join', room.id);

            const messageHandler = (message) => {
                setRoomMessages((prevMessages) => ({
                    ...prevMessages,
                    [message.roomId]: [...(prevMessages[message.roomId] || []), message]
                }));
            };

            socket.on('message', messageHandler);

            return () => {
                console.log("Leaving room:", room.id);
                socket.emit('leave', room.id);
                socket.off('message', messageHandler);
            };
        }
    }, [username, room]);

    const sendMessage = () => {
        if (newMessage.trim() && username) {
            const message = { roomId: room.id, text: newMessage, sender: username };
            socket.emit('message', message);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-room">
            {username && (
                <>
                    <h2>{room.name}</h2>
                    <div className="messages">
                        {(roomMessages[room.id] || []).map((message, index) => (
                            <div key={index}
                                className={`message ${message.sender === username ? 'my-message' : 'other-message'}`}>
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