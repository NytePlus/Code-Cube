import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    List, ListItem, Avatar, IconButton, Typography, Box, Card, CardContent, ListItemText, CardActions, Grid, ListItemIcon, ListItemAvatar
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Tag from './tag';
const RepoList = ({ repos, viewMode, reorderRepos }) => {
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        reorderRepos(result.source.index, result.destination.index);
    };
    if (viewMode === 'list') {
        return (
            <List sx={{ width: '100%', bgcolor: 'background.paper', pl: 4,  }}>
                {repos.map((repo) => (
                    <ListItem key={repo.id} alignItems="flex-start" sx={{ border: 1.5, borderColor: 'grey.300', my: 1, borderRadius: 2 }}>
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
                        <IconButton edge="end" aria-label="star">
                            <StarBorderIcon />
                            <span>{repo.stars}</span>
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        );
    } else if (viewMode === 'grid') {
        return (
            <Grid container spacing={2} sx={{ p: 2 }}>
                {repos.map((repo) => (
                    <Grid item key={repo.id} xs={12} sm={6} md={4} lg={3}>
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
                                <IconButton size="small">
                                    <StarBorderIcon />
                                    <span>{repo.stars}</span>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    // Additional view modes can be added here
    return null;
};

export default RepoList;
