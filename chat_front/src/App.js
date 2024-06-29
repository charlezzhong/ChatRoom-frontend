// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ChatRoomsList from './components/ChatRoomsList';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';
import './App.css';

const App = () => {
    const [chatRooms] = useState([
        { id: 'room1', name: 'Chat Room 1' },
        { id: 'room2', name: 'Chat Room 2' },
    ]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [username, setUsername] = useState(null);

    const handleLogin = (username) => {
        setUsername(username);
    };

    function onsetSelectedRoom(room){
        console.log("set from app")
        if (room !== selectedRoom) {
            setSelectedRoom(room);
        }
    }
    console.log("room: ", selectedRoom);

    return (
        <Router>
            <div className="app">
                {!username ? (
                    <Routes>
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                ) : (
                    <>
                        <div className="sidebar">
                            <ChatRoomsList chatRooms={chatRooms} onSelectRoom={onsetSelectedRoom} />
                        </div>
                        <div className="chat-room-container">
                            {selectedRoom ? (
                                <ChatRoom key={selectedRoom.id} room={selectedRoom} username={username} />
                            ) : (
                                <div>Please select a chat room</div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </Router>
    );
};

export default App;