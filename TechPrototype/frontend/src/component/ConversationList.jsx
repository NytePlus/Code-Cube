import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Divider, Avatar, ListItemAvatar } from '@mui/material';
import ConversationDetail from './ConversationDetail'; // 确保路径正确

const ConversationsList = ({ userName }) => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);

    useEffect(() => {
        if (userName) {
            fetch(`http://localhost:8081/api/conversations/user/${userName}`)
                .then(response => response.json())
                .then(data => setConversations(data))
                .catch(error => console.error('Error fetching conversations:', error));
        }
    }, [userName]);

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
                                    primary={conversation.partUserList[1]?.name}
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
            )}
        </>
    );
};

export default ConversationsList;
