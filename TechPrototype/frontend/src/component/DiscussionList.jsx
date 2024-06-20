import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Divider, ListItemAvatar, Avatar, Typography } from '@mui/material';
import DiscussionDetail from './DiscussionDetail';
import {SPRINGBOOTURL} from "../service/common"; // 确保路径正确

const DiscussionList = ({ name, dateRange }) => {
    const [discussions, setDiscussions] = useState([]);
    const [selectedDiscussionId, setSelectedDiscussionId] = useState(null);
    const [error, setError] = useState(null);

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

    return (
        <>
            {selectedDiscussionId ? (
                <DiscussionDetail
                    discussionId={selectedDiscussionId}
                    userId={3} // 你需要根据实际情况传递userId
                    onBack={handleBack}
                />
            ) : (
                <>
                    <Typography variant="h4" gutterBottom>
                        Discussions
                    </Typography>
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
                </>
            )}
        </>
    );
};

export default DiscussionList;
