import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const DiscussionDetail = ({ discussionId, userId, onBack }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (discussionId) {
            fetch(`http://localhost:8081/api/discussions/${discussionId}/comments`)
                .then(response => response.json())
                .then(data => setComments(data))
                .catch(error => console.error('Error fetching comments:', error));
        }
    }, [discussionId]);

    const handleSendComment = () => {
        if (newComment.trim()) {
            fetch(`http://localhost:8081/api/discussions/${discussionId}/comments?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newComment }), // 将评论内容包裹在对象内
            })
                .then(response => response.json())
                .then(comment => {
                    setComments([...comments, comment]);
                    setNewComment('');
                })
                .catch(error => console.error('Error sending comment:', error));
        }
    };

    return (
        <Box>
            <Button onClick={onBack}>Back</Button>
            <Typography variant="h5">Discussion Details</Typography>
            <List>
                {comments.map(comment => (
                    <React.Fragment key={comment.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={comment.user?.avatar || ''} alt={comment.user?.name || 'Unknown'}>
                                    {comment.user?.name ? comment.user.name[0] : 'U'}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={comment.user?.name || 'Unknown User'}
                                secondary={<ReactMarkdown>{comment.content}</ReactMarkdown>}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
            <TextField
                label="New Comment"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                style={{ marginTop: 16 }}
            />
            <Button variant="contained" color="primary" onClick={handleSendComment} style={{ marginTop: 8 }}>
                Send
            </Button>
        </Box>
    );
};

export default DiscussionDetail;
