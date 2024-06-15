import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const ConversationDetail = ({ conversationId, userId, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (conversationId) {
            fetch(`http://localhost:8081/api/conversations/${conversationId}/messages`)
                .then(response => response.json())
                .then(data => setMessages(data))
                .catch(error => console.error('Error fetching messages:', error));
        }
    }, [conversationId]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            fetch(`http://localhost:8081/api/conversations/${conversationId}/messages?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newMessage }),
            })
                .then(response => response.json())
                .then(message => {
                    setMessages([...messages, message]);
                    setNewMessage();
                })
                .catch(error => console.error('Error sending message:', error));
        }
    };


    return (
        <Box>
            <Button onClick={onBack}>Back</Button>
            <Typography variant="h5">Conversation Details</Typography>
            <List>
                {messages.map(msg => (
                    <React.Fragment key={msg.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={msg.user?.avatar || ''} alt={msg.user?.name || 'Unknown'}>
                                    {msg.user?.name ? msg.user.name[0] : 'U'}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={msg.user?.name || 'Unknown User'}
                                secondary={<ReactMarkdown>{msg.content}</ReactMarkdown>}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
            <TextField
                label="New Message"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                style={{ marginTop: 16 }}
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginTop: 8 }}>
                Send
            </Button>
        </Box>
    );
};

export default ConversationDetail;
