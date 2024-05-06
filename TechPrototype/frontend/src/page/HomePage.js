import React from 'react';
import { useState } from "react";
import Header from '../component/header';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RepoList from '../component/RepoList';
import TelegramIcon from '@mui/icons-material/Telegram';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment'
import {
    Grid,
    ToggleButtonGroup,
    ToggleButton,
    Box,
    IconButton,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction, Typography, Input
} from '@mui/material';
import { Fab, Tooltip } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import ReplyIcon from '@mui/icons-material/Reply';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ForumIcon from '@mui/icons-material/Forum';
import AndroidIcon from '@mui/icons-material/Android';
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Card from "@mui/material/Card";
import {useAuth} from "../component/AuthProvider";
import {postMessage} from "../service/message";

const HomePage = ({ repos, onDragEnd, toggleStar }) => {
    const auth = useAuth()

    const [viewMode, setViewMode] = useState('list'); // 默认视图模式为列表
    const [agentOpen, setAgentOpen] = useState(false);
    const [input, setInput] = useState('')
    // const [toolsOpen, setToolsOpen] = useState(false);
    //
    // const toggleTools = () => {
    //     setToolsOpen(!toolsOpen);
    // };
    const handleAgentChange = (event) => {
        setAgentOpen(!agentOpen);
    };

    const handleInputChange = (event) => {
        setInput(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const message = {
            path: '/conversation/agent',
            content: input,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            user: auth.user
        }
        const res = await postMessage(message)
        console.log(res)
    }

    const handleViewChange = (event, nextView) => {
        if (nextView !== null) {
            setViewMode(nextView);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            <Header />
            <Grid container spacing={2} sx={{ height: '100vh', mt: 8 }} style={{ marginTop: '24px' }}>
                <Grid item xs={1} md={0.5} sx={{ position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: 0, left: 20, height: '100%' }}>
                        <ToggleButtonGroup
                            orientation="vertical"
                            value={viewMode}
                            exclusive
                            onChange={handleViewChange}
                            aria-label="View mode"
                            sx={{ height: '100%' }}
                        >
                            <ToggleButton value="list" aria-label="list view">
                                <ViewListIcon />
                            </ToggleButton>
                            <ToggleButton value="grid" aria-label="grid view">
                                <ViewModuleIcon />
                            </ToggleButton>
                            <ToggleButton value="splay" aria-label="splay tree view">
                                <AccountTreeIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Grid>
                <Grid item xs={11} md={5.5} sx={{ position: 'relative', marginTop: '-32px', left: -10 }}>
                    <RepoList repos={repos} viewMode={viewMode} onDragEnd={onDragEnd} toggleStar={toggleStar} />
                    <Box sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', zIndex: 1000 }}>
                        <Tooltip title="Back to top" placement="left">
                            <Fab color="primary" size="small" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                <KeyboardArrowUpIcon />
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Filter starred repos" placement="left">
                            <Fab color="secondary" size="small" sx={{ mt: 1 }} onClick={() => {}}>
                                <StarBorderIcon />
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Filter my repos" placement="left">
                            <Fab color="default" size="small" sx={{ mt: 1 }} onClick={() => {}}>
                                <FilterListIcon />
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Search in repos" placement="left">
                            <Fab color="default" size="small" sx={{ mt: 1 }} onClick={() => {}}>
                                <SearchIcon />
                            </Fab>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* 右半部分 */}
                    <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', gap: '32px' }}>
                        <IconButton color="primary" sx={{ width: 100, height: 100, borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <EmailIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" sx={{ width: 100, height: 100, borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ReplyIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" sx={{ width: 100, height: 100, borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <NotificationsIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" sx={{ width: 100, height: 100, borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <AccessTimeIcon fontSize="large" />
                        </IconButton>
                    </Box>

                    {/*<Fab color="secondary" sx={{ position: 'fixed', bottom: 20, right: 20 }} onClick={toggleTools} size="small">*/}
                    {/*    {toolsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}*/}
                    {/*</Fab>*/}
                    {/*{toolsOpen && (*/}
                        <Box sx={{ position: 'fixed', bottom: 50, right: 20, display: 'flex', flexDirection: 'column' }}>
                    {/*        <Tooltip title="Forum entry" placement="left">*/}
                    {/*            <IconButton><ForumIcon /></IconButton>*/}
                    {/*        </Tooltip>*/}
                    {/*        <Tooltip title="Agent" placement="left">*/}
                    {/*            <IconButton><AndroidIcon /></IconButton>*/}
                    {/*        </Tooltip>*/}
                            <SpeedDial
                                ariaLabel="SpeedDial openIcon example"
                                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                                icon={<SpeedDialIcon openIcon={<ExpandMoreIcon />} />}
                            >
                                <SpeedDialAction key={"Agent"} icon={<AndroidIcon />}
                                                 tooltipTitle={"Agent"} onClick={handleAgentChange}/>
                                <SpeedDialAction key={"Forum"} icon={<ForumIcon />}
                                                 tooltipTitle={"Fourm"}/>
                            </SpeedDial>
                            {agentOpen && <Card sx={{mr: 10}}>
                                <div style={{display: 'flex'}}>
                                    <Typography sx={{mt: 1}} variant="h5"></Typography>
                                    <Box sx={{flexGrow: 1}}/>
                                    <IconButton size="large" color="inherit">
                                        <ClearOutlinedIcon/>
                                    </IconButton>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <Input onChange={handleInputChange}/>
                                    <Box sx={{flexGrow: 1}}/>
                                    <IconButton type="submit" onMouseDown={handleSubmit} sx={{p: '10px'}}>
                                        <TelegramIcon/>
                                    </IconButton>
                                </div>
                            </Card>
                            }
                        </Box>
                    {/*)}*/}
                </Grid>
            </Grid>
        </>
    );
};
export default HomePage;