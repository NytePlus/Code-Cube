import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Divider, ListItemAvatar, Avatar } from '@mui/material';
import DiscussionDetail from './DiscussionDetail';
import {SPRINGBOOTURL} from "../service/common"; // 确保路径正确

const DiscussionList = ({ name }) => {
    const [discussions, setDiscussions] = useState([]);
    const [selectedDiscussionId, setSelectedDiscussionId] = useState(null);

    useEffect(() => {
        fetch(SPRINGBOOTURL + `/api/discussions/${name}`, {credentials: "include"})
            .then(response => {
                console.log('Response status:', response.status);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched discussions:', data);
                setDiscussions(data);
            })
            .catch(error => console.error('Error fetching discussions:', error));
    }, [name]);

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
                    userId={1} // 你需要根据实际情况传递userId
                    onBack={handleBack}
                />
            ) : (
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
                                    primary={discussion.name}
                                    secondary={`${discussion.initUser.name}`}
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

export default DiscussionList;
