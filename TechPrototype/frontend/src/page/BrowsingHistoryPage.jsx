import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Header from "../component/header";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';
import Stack from '@mui/joy/Stack';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Fab, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import DiscussionList from '../component/DiscussionList';
import {useState} from "react";
import {useAuth} from "../component/AuthProvider";
import ConversationsList from "../component/ConversationList";

export default function BrowsingHistoryPage() {
    const [viewMode, setViewMode] = useState('list');
    const { user } = useAuth();

    const handleViewChange = (event, nextView) => {
        if (nextView !== null) {
            setViewMode(nextView);
        }
    };

    return (
        <>
            <Header />
            <Grid container spacing={2} sx={{ height: '100vh', mt: 8 }} style={{ marginTop: '24px' }}>
                <Grid item xs={2} sx={{ position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: 0, left: 20, height: '100%' }}>
                        <ToggleButtonGroup
                            orientation="vertical"
                            value={viewMode}
                            exclusive
                            onChange={handleViewChange}
                            aria-label="View mode"
                            sx={{ height: '100%' }}
                        >
                            <ToggleButton value="all" aria-label="all view">
                                <VisibilityIcon />
                            </ToggleButton>
                            <ToggleButton value="forum" aria-label="forum view">
                                <ForumIcon />
                            </ToggleButton>
                            <ToggleButton value="repo" aria-label="repo view">
                                <HomeIcon />
                            </ToggleButton>
                            <ToggleButton value="chat" aria-label="chat view">
                                <ChatIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Grid>
                <Grid item xs={8} sx={{ position: 'relative ' }}>
                    {viewMode === 'forum' ? <DiscussionList name={user} /> : viewMode === 'chat' ? <ConversationsList userName={user} /> : <DividerText />}

                </Grid>
                <Grid item xs={2} sx={{ position: 'relative' }}>
                    <OppositeContentTimeline />
                </Grid>
                <Grid item xs={3} sx={{ position: 'relative' }}>
                    <ResponsiveDateRangePickers />
                </Grid>
                <Grid item xs={11} sx={{ position: 'relative', marginTop: '-32px', left: -10 }}>
                    <Box sx={{ position: 'fixed', bottom: 20, left: '90%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', zIndex: 1000 }}>
                        <Tooltip title="Back to top" placement="left">
                            <Fab color="primary" size="small" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                <KeyboardArrowUpIcon />
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Filter starred repos" placement="left">
                            <Fab color="secondary" size="small" sx={{ mt: 1 }} onClick={() => { }}>
                                <StarBorderIcon />
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Filter my repos" placement="left">
                            <Fab color="default" size="small" sx={{ mt: 1 }} onClick={() => { }}>
                                <FilterListIcon />
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Search in repos" placement="left">
                            <Fab color="default" size="small" sx={{ mt: 1 }} onClick={() => { }}>
                                <SearchIcon />
                            </Fab>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

function OppositeContentTimeline() {
    return (
        <Timeline position="alternate">
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    09:30 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Eat</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    10:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Code</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    12:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Sleep</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    9:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Repeat</TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}

function DividerText() {
    const content = (
        <Box sx={{ fontSize: 'sm', color: 'text.tertiary' }}>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
        </Box>
    );

    return (
        <Stack spacing={1}>
            {content}
            <Divider>
                {/*Visual indicator*/}
            </Divider>
            {content}
            <Divider>
                {/*Visual indicator*/}
            </Divider>
            {content}
        </Stack>
    );
}

function ResponsiveDateRangePickers() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem component="StaticDateRangePicker">
                <StaticDateRangePicker
                    defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
                    displayStaticWrapperAs="desktop"
                />
            </DemoItem>
        </LocalizationProvider>
    );
}
