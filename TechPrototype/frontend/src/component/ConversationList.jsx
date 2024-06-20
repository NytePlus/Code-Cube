import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Divider, Avatar, ListItemAvatar, Typography, Box } from '@mui/material';
import ConversationDetail from './ConversationDetail';
import {SPRINGBOOTURL} from "../service/common"; // 确保路径正确

const ConversationsList = ({ userName, dateRange }) => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);

    useEffect(() => {
        if (userName) {
            fetch(`${SPRINGBOOTURL}/api/conversations/user/${userName}`, {
                method: "GET",
                credentials: "include" // Ensure cookies are included in the request
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(async data => {
                    // Fetch the last message date for each conversation
                    const conversationsWithDates = await Promise.all(data.map(async (conversation) => {
                        try {
                            const lastMessageResponse = await fetch(`${SPRINGBOOTURL}/api/conversations/${conversation.id}/last-message-date`, {
                                method: "GET",
                                credentials: "include" // Ensure cookies are included in the request
                            });

                            if (lastMessageResponse.ok) {
                                const lastMessageDate = await lastMessageResponse.text(); // Change to text() to handle date string
                                return { ...conversation, lastMessageDate: new Date(lastMessageDate) };
                            } else {
                                return { ...conversation, lastMessageDate: null };
                            }
                        } catch (error) {
                            console.error('Error fetching last message date:', error);
                            return { ...conversation, lastMessageDate: null };
                        }
                    }));

                    // Filter conversations by date range
                    const filteredConversations = conversationsWithDates.filter(conversation => {
                        const lastMessageDate = conversation.lastMessageDate;
                        return !lastMessageDate || (lastMessageDate >= dateRange[0].toDate() && lastMessageDate <= dateRange[1].toDate());
                    });

                    setConversations(filteredConversations);
                })
                .catch(error => console.error('Error fetching conversations:', error));
        }
    }, [userName, dateRange]);

    const handleConversationClick = (conversationId) => {
        setSelectedConversationId(conversationId);
    };

    const handleBack = () => {
        setSelectedConversationId(null);
    };

    return (
        <>
            {selectedConversationId ? (
                <ConversationDetail conversationId={selectedConversationId} userId='1' onBack={handleBack}/> // 这里的userId可以根据实际情况传递
            ) : (
                <>
                    <Typography variant="h4" gutterBottom>
                        Conversations
                    </Typography>
                    <List>
                        {conversations.map((conversation) => (
                            <React.Fragment key={conversation.id}>
                                <ListItem button onClick={() => handleConversationClick(conversation.id)}>
                                    <ListItemAvatar>
                                        <Avatar src={conversation.partUserList[1]?.avatar} alt={conversation.partUserList[1]?.name}>
                                            {conversation.partUserList[1]?.name[0]}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span>{conversation.partUserList[1]?.name}</span>
                                                <Typography variant="body2" color="textSecondary">
                                                    {conversation.lastMessageDate ? conversation.lastMessageDate.toLocaleString() : 'No messages'}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        ))}
                    </List>
                </>
            )}
        </>
    );
};

export default ConversationsList;
