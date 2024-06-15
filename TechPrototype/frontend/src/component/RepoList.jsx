import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
    List,
    ListItem,
    Avatar,
    IconButton,
    Typography,
    Box,
    Card,
    CardContent,
    ListItemText,
    CardActions,
    Grid,
    ListItemIcon,
    ListItemAvatar,
    Link, Paper
} from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import Tag from './tag';
import {useNavigate} from "react-router-dom";
import StarButton from "./StarButton"
import {SPRINGBOOTURL} from "../service/common";

const RepoList = ({ repos, viewMode, onDragEnd }) => {
    const navigate = useNavigate()

    console.log(repos)
    if (viewMode === 'list') {
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="repos">
                    {(provided) => (
                        <List {...provided.droppableProps} ref={provided.innerRef}>
                            {repos && repos.map((repo, index) => (
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{ border: 1, borderColor: 'grey.300', my: 1, borderRadius: 2 }}
                                        >
                                            <ListItem alignItems="flex-start" sx={{h: 50}}>
                                                <ListItemAvatar>
                                                    <Avatar alt={repo.initUser.name} src={SPRINGBOOTURL + repo.initUser.avatar}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Link>
                                                            <Typography variant="h6" sx={{mt: -1}} onClick={()=>navigate(`${repo.path}`)}>
                                                                {repo.initUser.name + '/' + repo.name}
                                                            </Typography>
                                                        </Link>}
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                sx={{display: 'block'}}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {repo.introduction}
                                                            </Typography>
                                                            <div style={{ display: 'flex', marginTop: '8px' }}>
                                                                {repo.repoTagList.map((tag) => (
                                                                    <Tag key={tag.name} label={tag.name} />
                                                                ))}
                                                            </div>
                                                        </>
                                                    }
                                                />
                                                <StarButton path={repo.path} initStar={repo.star}/>
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
                            {repos && repos.map((repo, index) => (
                                <Draggable key={index} draggableId={`repo-${index}`} index={index}>
                                    {(provided) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <CardContent>
                                                    <Typography variant="h6" component="div" noWrap>
                                                        {repo.name}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary" noWrap>
                                                        {repo.initUser.name}
                                                    </Typography>
                                                    <Typography variant="body2" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                                        {repo.introduction}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                                                    {repo.repoTagList.length > 0 && <Tag label={repo.repoTagList[0].name} />}
                                                    <StarButton path={repo.path} initStar={repo.star}/>
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
