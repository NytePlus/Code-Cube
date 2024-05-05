import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
    List, ListItem, Avatar, IconButton, Typography, Box, Card, CardContent, ListItemText, CardActions, Grid, ListItemIcon, ListItemAvatar
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from "@mui/icons-material/Star";
import Tag from './tag';
const RepoList = ({ repos, viewMode, onDragEnd, toggleStar }) => {

    if (viewMode === 'list') {
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="repos">
                    {(provided) => (
                        <List {...provided.droppableProps} ref={provided.innerRef}>
                            {repos.map((repo, index) => (
                                <Draggable key={repo.id} draggableId={repo.id.toString()} index={index}>
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{ border: 1, borderColor: 'grey.300', my: 1, borderRadius: 2 }}
                                        >
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt={repo.owner.name} src={repo.owner.avatar_url} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={repo.name}
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                sx={{ display: 'block' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {repo.owner.name}
                                                            </Typography>
                                                            {repo.description}
                                                            <div style={{ display: 'flex', marginTop: '8px' }}>
                                                                {repo.tags.map((tag) => (
                                                                    <Tag key={tag} label={tag} />
                                                                ))}
                                                            </div>
                                                        </>
                                                    }
                                                />
                                                <IconButton edge="end" aria-label="star" onClick={() => toggleStar(repo.id)}>
                                                    {repo.isStarred ? <StarIcon /> : <StarBorderIcon />}
                                                    <span>{repo.stars}</span>
                                                </IconButton>
                                            </ListItem>
                                        </Box>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
        );
    } else if (viewMode === 'grid') {
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="repos" direction="horizontal" type="GRID">
                    {(provided) => (
                        <Grid container {...provided.droppableProps} ref={provided.innerRef} spacing={2} sx={{ p: 2 }}>
                            {repos.map((repo, index) => (
                                <Draggable key={repo.id} draggableId={`repo-${repo.id}`} index={index}>
                                    {(provided) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <CardContent>
                                                    <Typography variant="h6" component="div" noWrap>
                                                        {repo.name}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary" noWrap>
                                                        {repo.owner.name}
                                                    </Typography>
                                                    <Typography variant="body2" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                                        {repo.description}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                                                    {repo.tags.length > 0 && <Tag label={repo.tags[0]} />}
                                                    <IconButton size="small" edge="end" aria-label="star" onClick={() => toggleStar(repo.id)}>
                                                        {repo.isStarred ? <StarIcon /> : <StarBorderIcon />}
                                                        <span>{repo.stars}</span>
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }

    // Additional view modes can be added here
    return null;
};

export default RepoList;
