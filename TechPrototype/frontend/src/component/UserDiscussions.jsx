import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import {getJson, SPRINGBOOTURL} from "../service/common";

const UserDiscussions = ({ userId }) => {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await getJson(`${SPRINGBOOTURL}/api/discussions/user/${userId}`);
                setDiscussions(response);
            } catch (error) {
                console.error('Error fetching discussions:', error);
            }
        };

        if (userId) {
            fetchDiscussions();
        }
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
