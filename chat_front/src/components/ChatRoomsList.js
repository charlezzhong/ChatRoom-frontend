// src/components/ChatRoomsList.js
import React from 'react';

const ChatRoomsList = ({ chatRooms, onSelectRoom }) => {
    return (
        <div className="chat-rooms-list">
            <h2>Chat Rooms</h2>
            <ul>
                {chatRooms.map(room => (
                    <li key={room.id} onClick={() => onSelectRoom(room)}>
                        {room.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRoomsList;