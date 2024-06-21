// src/App.js
import React, { useState } from 'react';
import ChatRoomsList from './components/ChatRoomsList';
import ChatRoom from './components/ChatRoom';
import './App.css'; // Make sure to create styles for your components

const App = () => {
    const [chatRooms] = useState([
        { id: 'room1', name: 'Chat Room 1' },
        { id: 'room2', name: 'Chat Room 2' },
    ]);
    const [selectedRoom, setSelectedRoom] = useState(null);

    return (
        <div className="app">
            <div className="sidebar">
                <ChatRoomsList chatRooms={chatRooms} onSelectRoom={setSelectedRoom} />
            </div>
            <div className="chat-room-container">
                {selectedRoom ? (
                    <ChatRoom room={selectedRoom} />
                ) : (
                    <div>Please select a chat room</div>
                )}
            </div>
        </div>
    );
};

export default App;