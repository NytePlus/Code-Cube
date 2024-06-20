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
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import Stack from '@mui/joy/Stack';
import DiscussionList from '../component/DiscussionList';
import { useState, useEffect } from 'react';
import { useAuth } from '../component/AuthProvider';
import ConversationsList from "../component/ConversationList";
import RightTools from "../component/RightTools";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import Header from "../component/header";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function BrowsingHistoryPage() {
    const [viewMode, setViewMode] = useState('chat');
    const { user } = useAuth();
    const [dateRange, setDateRange] = useState([dayjs('2024-04-17'), dayjs('2024-06-21')]);
    const [showDateFilter, setShowDateFilter] = useState(false);

    const handleViewChange = (event, nextView) => {
        if (nextView !== null) {
            setViewMode(nextView);
        }
    };

    const toggleDateFilter = () => {
        setShowDateFilter(!showDateFilter);
    };

    useEffect(() => {
        // Call your fetch function here if needed
    }, [dateRange]);

    return (
        <>
            <Header />
            <Grid container spacing={2} sx={{ height: '100vh', mt: 8 }} style={{ marginTop: '24px' }}>
                <Grid item xs={1} sx={{ position: 'relative' }}>
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
                <Grid item xs={6.5} sx={{ position: 'relative ' }}>
                    {viewMode === 'forum' ? <DiscussionList name={user} dateRange={dateRange} /> : viewMode === 'chat' ? <ConversationsList userName={user} dateRange={dateRange} /> : <DividerText />}
                </Grid>
                <Grid item xs={4.5} sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {showDateFilter && <ResponsiveDateRangePickers setDateRange={setDateRange} dateRange={dateRange} />}
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={toggleDateFilter} startIcon={<FilterListIcon />}>
                            {showDateFilter ? 'Hide Filters' : 'Show Filters'}
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={10} sx={{ position: 'relative', marginTop: '-32px', left: -10 }}>
                    <Box sx={{ position: 'fixed', bottom: 20, left: '90%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', zIndex: 1000 }}>
                        <RightTools />
                    </Box>
                </Grid>
            </Grid>
        </>
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

function ResponsiveDateRangePickers({ setDateRange, dateRange }) {
    const handleDateChange = (newValue) => {
        setDateRange(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem component="StaticDateRangePicker">
                <StaticDateRangePicker
                    value={dateRange}
                    displayStaticWrapperAs="desktop"
                    onChange={handleDateChange}
                />
            </DemoItem>
        </LocalizationProvider>
    );
}
