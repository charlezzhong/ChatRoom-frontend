// src/components/ChatRoomsList.js
import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material';

const ChatRoomsList = ({ chatRooms, onSelectRoom }) => {
    return (
        <div className="chat-rooms-list">
            <h2>Chat Rooms</h2>
            <List>
                {chatRooms.map(room => (
                    <ListItem button key={room.id} onClick={() => onSelectRoom(room)}>
                        <ListItemAvatar>
                            <Avatar>{room.name.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={room.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Last message...
                                    </Typography>
                                    {" — This is a preview of the last message"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ChatRoomsList;