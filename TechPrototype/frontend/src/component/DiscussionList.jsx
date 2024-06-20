import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Divider, ListItemAvatar, Avatar, Typography, Button, Modal, Box, TextField } from '@mui/material';
import DiscussionDetail from './DiscussionDetail';
import { SPRINGBOOTURL } from "../service/common"; // 确保路径正确
import { useAuth } from "../component/AuthProvider"; // 确保路径正确

const DiscussionList = ({ name, dateRange }) => {
    const [discussions, setDiscussions] = useState([]);
    const [selectedDiscussionId, setSelectedDiscussionId] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
    const auth = useAuth();

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await fetch(`${SPRINGBOOTURL}/api/discussions/all`, {
                    method: "GET",
                    credentials: "include", // Ensure cookies are included in the request
                });

                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched discussions:', data);

                // Fetch the last comment date for each discussion
                const discussionsWithDates = await Promise.all(data.map(async (discussion) => {
                    try {
                        const lastCommentResponse = await fetch(`${SPRINGBOOTURL}/api/discussions/${discussion.id}/comments/last`, {
                            method: "GET",
                            credentials: "include", // Ensure cookies are included in the request
                        });

                        if (lastCommentResponse.ok) {
                            const lastCommentDate = await lastCommentResponse.json();
                            return { ...discussion, lastCommentDate: new Date(lastCommentDate) };
                        } else {
                            return { ...discussion, lastCommentDate: null };
                        }
                    } catch (error) {
                        console.error('Error fetching last comment date:', error);
                        return { ...discussion, lastCommentDate: null };
                    }
                }));

                // Filter discussions by date range
                const filteredDiscussions = discussionsWithDates.filter(discussion => {
                    const lastCommentDate = discussion.lastCommentDate;
                    return !lastCommentDate || (lastCommentDate >= dateRange[0].toDate() && lastCommentDate <= dateRange[1].toDate());
                });

                setDiscussions(filteredDiscussions);
            } catch (error) {
                console.error('Error fetching discussions:', error);
                setError(error.message);
            }
        };

        if (name && dateRange) {
            fetchDiscussions();
        }
    }, [name, dateRange]);

    const handleDiscussionClick = (discussionId) => {
        setSelectedDiscussionId(discussionId);
    };

    const handleBack = () => {
        setSelectedDiscussionId(null);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateDiscussion = async () => {
        try {
            const params = new URLSearchParams({
                name: auth.user,
                title: newDiscussionTitle
            });

            const response = await fetch(`${SPRINGBOOTURL}/api/discussions/create?${params.toString()}`, {
                method: 'POST',
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const newDiscussion = await response.json();
            setDiscussions([...discussions, newDiscussion]);
            handleClose();
        } catch (error) {
            console.error('Error creating discussion:', error);
        }
    };

    return (
        <>
            {selectedDiscussionId ? (
                <DiscussionDetail
                    discussionId={selectedDiscussionId}
                    userId={4} // 你需要根据实际情况传递userId
                    onBack={handleBack}
                />
            ) : (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h4" gutterBottom>
                            Discussions
                        </Typography>
                        <Button variant="contained" onClick={handleOpen}>
                            Create New Discussion
                        </Button>
                    </Box>
                    <List>
                        {discussions.map((discussion) => (
                            <React.Fragment key={discussion.id}>
                                <ListItem button onClick={() => handleDiscussionClick(discussion.id)}>
                                    <ListItemAvatar>
                                        <Avatar src={discussion.initUser.avatar} alt={discussion.initUser.name}>
                                            {discussion.initUser.name[0]}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span>{discussion.name}</span>
                                                <Typography variant="body2" color="textSecondary">
                                                    {discussion.lastCommentDate ? discussion.lastCommentDate.toLocaleString() : 'No comments'}
                                                </Typography>
                                            </div>
                                        }
                                        secondary={`${discussion.initUser.name}`}
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        ))}
                    </List>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}>
                            <Typography id="modal-title" variant="h6" component="h2">
                                Create New Discussion
                            </Typography>
                            <TextField
                                fullWidth
                                label="Discussion Title"
                                value={newDiscussionTitle}
                                onChange={(e) => setNewDiscussionTitle(e.target.value)}
                                sx={{ mt: 2 }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleCreateDiscussion}
                                sx={{ mt: 2 }}
                            >
                                Create
                            </Button>
                        </Box>
                    </Modal>
                </>
            )}
        </>
    );
};

export default DiscussionList;
