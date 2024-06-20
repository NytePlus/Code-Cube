import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { SPRINGBOOTURL } from "../service/common";
import { Link } from 'react-router-dom'; // 导入 Link 组件

const ConversationDetail = ({ conversationId, userId, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${SPRINGBOOTURL}/api/conversations/${conversationId}/messages`, {
                    method: "GET",
                    credentials: "include", // Ensure cookies are included in the request
                });

                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched messages:', data);
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setError(error.message);
            }
        };

        if (conversationId) {
            fetchMessages();
        }
    }, [conversationId]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                const response = await fetch(`${SPRINGBOOTURL}/api/conversations/${conversationId}/messages?userId=${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: newMessage }),
                    credentials: "include", // Ensure cookies are included in the request
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const message = await response.json();
                setMessages([...messages, message]);
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
                setError(error.message);
            }
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
                                <Link to={`/${msg.user?.name}/profile`} style={{ textDecoration: 'none' }}>
                                    <Avatar src={msg.user?.avatar || ''} alt={msg.user?.name || 'Unknown'}>
                                        {msg.user?.name ? msg.user.name[0] : 'U'}
                                    </Avatar>
                                </Link>

                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>{msg.user?.name || 'Unknown User'}</span>
                                        <Typography variant="body2" color="textSecondary">
                                            {new Date(msg.date).toLocaleString()}
                                        </Typography>
                                    </Box>
                                }
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
