import React from 'react';
import {styled, alpha} from '@mui/material/styles';
import {AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {HeaderSearchBar, InputBaseWithoutCanlendar} from "./searchBar";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthProvider";
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import {useTranslation} from "react-i18next";
import Divider from "@mui/material/Divider";

<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet"/>

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

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function PrimarySearchAppBar() {
    const navigate = useNavigate()
    const auth = useAuth()
    const { t, i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleTransClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleTransClose = (lang) => {
        setAnchorEl(null);
        if(lang)i18n.changeLanguage(lang)
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        fontFamily: 'Roboto Mono, monospace',
                        fontWeight: 700,
                        color: 'white',
                        textShadow: '1px 1px 2px black',
                        display: { xs: 'none', sm: 'block' }
                    }}
                >
                    Code Cube
                </Typography>
                {/*<Search>*/}
                {/*    <SearchIconWrapper>*/}
                {/*        <SearchIcon/>*/}
                {/*    </SearchIconWrapper>*/}
                {/*    <StyledInputBase*/}
                {/*        placeholder="Search…"*/}
                {/*        inputProps={{'aria-label': 'search'}}*/}
                {/*    />*/}
                {/*</Search>*/}
                <HeaderSearchBar/>
                <div style={{flexGrow: 1}}/>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <IconButton size="large" color="inherit" onClick={handleTransClick}>
                        <TranslateOutlinedIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => handleTransClose(null)}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => handleTransClose('en')}>English</MenuItem>
                        <MenuItem onClick={() => handleTransClose('zh')}>中文</MenuItem>
                    </Menu>
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <MailIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => {navigate('/' + auth.user + '/profile')}}
                    >
                        <AccountCircle/>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default PrimarySearchAppBar;
