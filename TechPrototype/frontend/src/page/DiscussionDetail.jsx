import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import {SPRINGBOOTURL} from "../service/common";

const DiscussionDetail = () => {
    const { discussionId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch( SPRINGBOOTURL + `/api/discussions/${discussionId}/comments`, {credentials: "include"})
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, [discussionId]);

    return (
        <List>
            {comments.map((comment) => (
                <React.Fragment key={comment.id}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={comment.content}
                            secondary={`By user ${comment.user.name} on ${new Date(comment.date).toLocaleString()}`}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
};

export default DiscussionDetail;
