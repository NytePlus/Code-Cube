import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Header from "../component/header";
import {useState} from "react";
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
import RepoList from "../component/RepoList";
import {Fab, Tooltip} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Chat from '../component/Chat';

export default function ChatPage(){


    const theme = createTheme();


    return(
        <>
            <Header />
            <Grid container spacing={2} sx={{ height: '100vh', mt: 8 }} style={{ marginTop: '24px' }}>
                <Grid item xs={2} sx={{ position: 'relative' }}>

                </Grid>
                <Grid item xs={8} sx={{ position: 'relative '}}>
                    <Chat />
                </Grid>
                <Grid item xs={2} sx={{ position: 'relative'}}>
                    <OppositeContentTimeline />
                </Grid>
                <Grid item xs={11} sx={{ position: 'relative', marginTop: '-32px', left: -10 }}>
                    <Box sx={{ position: 'fixed', bottom: 20, left: '90%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', zIndex: 1000 }}>
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
                    sx={{
                        [`.${pickersLayoutClasses.contentWrapper}`]: {
                            alignItems: 'center',
                        },
                    }}
                />
            </DemoItem>
        </LocalizationProvider>
    );
}


