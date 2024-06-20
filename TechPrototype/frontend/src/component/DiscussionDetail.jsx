import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { SPRINGBOOTURL } from "../service/common";
import { Link } from 'react-router-dom'; // 导入 Link 组件

const DiscussionDetail = ({ discussionId, userId, onBack }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`${SPRINGBOOTURL}/api/discussions/${discussionId}/comments`, {
                    method: "GET",
                    credentials: "include", // Ensure cookies are included in the request
                });
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched comments:', data);
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError(error.message);
            }
        };

        if (discussionId) {
            fetchComments();
        }
    }, [discussionId]);

    const handleSendComment = () => {
        if (newComment.trim()) {
            fetch(`${SPRINGBOOTURL}/api/discussions/${discussionId}/comments?userId=${userId}`, {
                method: 'POST',
                credentials: "include",
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
                                <Link to={`/${comment.user?.name}/profile`} style={{ textDecoration: 'none' }}>
                                    <Avatar src={comment.user?.avatar || ''} alt={comment.user?.name || 'Unknown'}>
                                        {comment.user?.name ? comment.user.name[0] : 'U'}
                                    </Avatar>
                                </Link>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>{comment.user?.name || 'Unknown User'}</span>
                                        <Typography variant="body2" color="textSecondary">
                                            {new Date(comment.date).toLocaleString()}
                                        </Typography>
                                    </div>
                                }
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
