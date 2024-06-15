import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import * as React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState} from "react";
import dayjs from "dayjs";
import moment from "moment/moment";
import {Box, Button, Dialog, Input, Tooltip, Typography} from "@mui/material";
import {alpha, styled} from "@mui/material/styles";
import {MuiChipsInput} from "mui-chips-input";
import {getRepoByFilter} from "../service/repo";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthProvider";
import {displayFilterRepos} from "../page/HomePage";
import {useFilter} from "./FilterProvider";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

export function HeaderSearchBar() {
    const navigate = useNavigate()
    const auth = useAuth()
    const filter = useFilter()
    const [text, setText] = useState('')
    const [activate, setActivate] = useState(false)
    const [date, setDate] = useState([dayjs("2020-01-01"), dayjs("2030-01-01")])
    const [tags, setTags] = useState([]);
    const [owner, setOwner] = useState("");

    const [filterDate, setFilterDate] = useState(false)
    const [filterLabel, setFilterLabel] = useState(false)
    const [filterOwner, setFilterOwner] = useState(false)

    const onSubmit = async () => {
        const data = {
            name: text,
            begin: date[0].format('YYYY-MM-DD'),
            end: date[1].format('YYYY-MM-DD'),
            user: owner,
            labels: tags
        }
        filter.setFilter(data)
        navigate('/' + auth.user)
    }
    return (
        <>
            {!activate &&
                <Button onClick={() => {setActivate(true)}}>
                    <Search
                        sx={{background: '0.5', display: 'flex', alignItems: 'center', ml: 10, width: 600}}
                    >
                        <IconButton sx={{p: '10px'}} aria-label="search" onClick={() => {}}>
                            <SearchIcon/>
                        </IconButton>
                        <InputBase sx={{flex: 1}} placeholder="输入关键字"/>
                    </Search>
                </Button>}
            <Dialog
                open={activate}
                onClose={() => {setActivate(false)}}
                PaperProps={{ sx: { position: "fixed", width: 1400, top: 10, left: 200, m: 0 } }}
            >
                <Box sx={{display: 'flex'}}>
                    <Tooltip title="按创建日期过滤" placement="bottom">
                        <IconButton onClick={() => setFilterDate(!filterDate)}>
                            <CalendarMonthOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="按标签过滤" placement="bottom">
                        <IconButton sx={{ ml: -1 }} onClick={() => setFilterLabel(!filterLabel)}>
                            <LocalOfferOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="按拥有者过滤" placement="bottom">
                        <IconButton sx={{ ml: -1 }} onClick={() => setFilterOwner(!filterOwner)}>
                            <PersonSearchOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                    <Divider sx={{ height: 28, mt: 1 }} orientation="vertical" />
                    <Tooltip title="搜索仓库" placement="bottom">
                        <IconButton>
                            <ViewInArOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                    <InputBase
                        sx={{ flex: 1 }}
                        placeholder="输入仓库名" value={text}
                        onChange={(event) => {setText(event.target.value)}}
                    />
                    {text.length > 0 && <IconButton sx={{p: '10px'}} onClick={() => {setText("")}}>
                        <CancelIcon/>
                    </IconButton>}
                    <Divider sx={{ height: 28, mt: 1 }} orientation="vertical" />
                    <IconButton sx={{ p: '10px' }} onClick={() => onSubmit(text)}>
                        <SearchIcon />
                    </IconButton>
                </Box>
                {filterOwner &&
                    <Box sx={{display: 'flex', ml: 5, mt: 1, mb: 1}}>
                        <Input placeholder="输入仓库所有者" onChange={(e) => setOwner(e.target.value)}/>
                    </Box>}
                {filterDate && <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer sx={{ml: 5, mr: 5, mt: 1, mb: 1}} components={['DateRangePicker']}>
                        <DateRangePicker localeText={{start: 'From', end: 'To'}} value={date}
                                         onChange={(newValue) => {
                                             setDate(newValue)}}/>
                    </DemoContainer>
                </LocalizationProvider>}
                {filterLabel && <MuiChipsInput sx={{ml: 5, mr: 5, mt: 1, mb: 1}} value={tags} onChange={(e) => {setTags(e)}} />}
                </Dialog>
        </>
    );
}