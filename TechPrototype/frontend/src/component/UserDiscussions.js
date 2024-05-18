import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const UserDiscussions = ({ userId }) => {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        axios.get(`/api/discussions/user/${userId}`)
            .then(response => {
                setDiscussions(response.data);
            })
            .catch(error => {
                console.error('Error fetching discussions:', error);
            });
    }, [userId]);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                My Discussions
            </Typography>
            <List>
                {discussions.map(discussion => (
                    <ListItem key={discussion.id}>
                        <ListItemAvatar>
                            <Avatar src={discussion.initUser.avatar} />
                        </ListItemAvatar>
                        <ListItemText primary={discussion.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default UserDiscussions;
