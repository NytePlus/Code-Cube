import React, {useEffect} from 'react';
import { useState } from "react";
import Header from '../component/header';
import RepoList from '../component/RepoList';

import {
    Grid,
    ToggleButtonGroup,
    ToggleButton,
    Box,
    IconButton,
    Dialog,
    Paper,
    Typography,
    DialogContent,
    DialogTitle,
    DialogContentText,
    DialogActions,
    Button,
    Input,
    Switch, Alert, Snackbar,
} from '@mui/material';
import { Fab, Tooltip } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import EmailIcon from '@mui/icons-material/Email';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import ChildFriendlyOutlinedIcon from '@mui/icons-material/ChildFriendlyOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import RightTools from '../component/RightTools'
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {
    changeStar,
    createGenerateRepo,
    createRepo,
    getAllPublicRepo,
    getAllRepoByUser,
    getRepoByFilter
} from "../service/repo";
import {useAuth} from "../component/AuthProvider";
import {MuiChipsInput} from "mui-chips-input";
import {useFilter} from "../component/FilterProvider";
import {useNavigate} from "react-router-dom";
import {Textarea} from "@mui/joy";
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const auth = useAuth()
    const filter = useFilter()
    const { t } = useTranslation();
    const navigate = useNavigate()
    const [snack, setSnack] = useState(false)
    const [viewMode, setViewMode] = useState('list'); // 默认视图模式为列表
    const [repoCreateOpen, setRepoCreateOpen] = useState(false)
    const [publish, setPublish] = useState(false)
    const [generate, setGenerate] = useState(false)
    const [repoCreateName, setRepoCreateName] = useState('')
    const [repoCreateIntro, setRepoCreateIntro] = useState('')
    const [repos, setRepos] = useState([]);
    const [chips, setChips] = useState([]);

    const handleChipChange = (event) => {
        setChips(event)
    }

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnack(false);
    }
    const displayRepos = async() => {
        let repos
        if(filter.filter === null)
            repos = await getAllPublicRepo();
        else
            repos = await getRepoByFilter(filter.filter)
        setRepos(repos);
    }

    const displayMyRepos = async () => {
        let myRepos = await getAllRepoByUser(auth.user);
        setRepos(myRepos);
    }

    const displayStarRepos = async () => {
        let starRepos = await getAllRepoByUser(auth.user);
        setRepos(starRepos);
    }

    useEffect(() => {
        displayRepos();
    }, [filter.filter])

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const items = Array.from(repos);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        setRepos(items);
    };

    const handleViewChange = (event, nextView) => {
        if (nextView !== null) {
            setViewMode(nextView);
        }
    };

    const handleCreateRepo = async () => {
        setRepoCreateOpen(false)
        setChips([])
        if(generate) {
            let res = await createGenerateRepo({user: {name: auth.user, password: auth.token},
                path: '/' + auth.user + '/' + repoCreateName,
                publish: publish, introduction: repoCreateIntro,
                tagNameList: chips})
            console.log(res)
        } else{
            createRepo({user: {name: auth.user, password: auth.token},
                path: '/' + auth.user + '/' + repoCreateName,
                publish: publish, introduction: repoCreateIntro,
                tagNameList: chips})
        }
        setSnack(true)
    }

    const handleCreateRepoClose = () => {
        setRepoCreateOpen(! repoCreateOpen)
        setPublish(false)
        setGenerate(false)
    }

    const handlePublish = () => {
        setPublish(! publish)
    }

    const handleCreateRepoName = (e) => {
        setRepoCreateName(e.target.value)
    }

    const handleCreateRepoIntro = (e) => {
        setRepoCreateIntro(e.target.value)
    }

    return (
        <>
            <Header />
            <Snackbar open={snack} autoHideDuration={4000} onClose={handleSnackClose}>
                <Alert
                    onClose={handleSnackClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {t("Project created successfully!")}
                </Alert>
            </Snackbar>
            <Dialog
                open={repoCreateOpen}
                onClose={handleCreateRepoClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Dialog
                    open={repoCreateOpen}
                    onClose={handleCreateRepoClose}>
                    <DialogTitle id="alert-dialog-title" sx={{display: 'flex'}}>
                        {t("Create Repository")}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{display: 'flex'}}>
                            <Typography sx={{mt: 2,whiteSpace:'nowrap'}} variant="subtitle1">{t("repos name")}</Typography>
                            <Input sx={{pt: 2}} onChange={handleCreateRepoName}></Input>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <Typography sx={{mt: 2,whiteSpace:'nowrap'}} variant="subtitle1">{t("intro")}</Typography>
                            <Textarea sx={{ml: 1, mt: 2}} onChange={handleCreateRepoIntro}></Textarea>
                        </Box>
                        <Box sx={{display: 'flex', mt: 2}}>
                            <Switch onClick={handlePublish} color={'success'}/>
                            {publish ? <PublicOutlinedIcon sx={{color:"green", fontSize:30}}/>:<AdminPanelSettingsIcon sx={{fontSize:30}}/>}
                            {publish ? <Typography sx={{ml:1, whiteSpace:'nowrap'}} variant="subtitle1">{t("public")}</Typography>:
                                <Typography sx={{ml:1, whiteSpace:'nowrap'}} variant="subtitle1">{t("private")}</Typography>}
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <Switch onClick={() => setGenerate(!generate)} color={'success'}/>
                            {generate ? <DeliveryDiningOutlinedIcon sx={{color:"green", fontSize:30}}/>:<ChildFriendlyOutlinedIcon sx={{fontSize:30}}/>}
                            {generate ? <Typography sx={{ml:1, whiteSpace:'nowrap'}} variant="subtitle1">{t("Generated by metagpt")}</Typography>:
                                <Typography sx={{ml:1, whiteSpace:'nowrap'}} variant="subtitle1">{t("Start from scratch")}</Typography>}
                        </Box>
                        <Typography sx={{whiteSpace:'nowrap'}} variant="subtitle1">{t("Tag")}</Typography>
                        <MuiChipsInput value={chips} onChange={handleChipChange} />
                    </DialogContent>
                    <DialogActions>
                        <IconButton onClick={handleCreateRepo}>
                            <CheckOutlinedIcon/>
                        </IconButton>
                        <IconButton onClick={handleCreateRepoClose}>
                            <ClearOutlinedIcon/>
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </Dialog>
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
                    <RepoList repos={repos} viewMode={viewMode} onDragEnd={onDragEnd} />
                    <Box sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', zIndex: 1000 }}>
                        <Tooltip title={t("Filter starred repos")} placement="left">
                            <Fab color="secondary" size="small" sx={{ mt: 1 }} onClick={() => {}}>
                                <StarBorderIcon onClick={displayStarRepos}/>
                            </Fab>
                        </Tooltip>
                        <Tooltip title={t("Filter my repos")} placement="left">
                            <Fab color="default" size="small" sx={{ mt: 1 }} onClick={() => {}}>
                                <FilterListIcon onClick={displayMyRepos}/>
                            </Fab>
                        </Tooltip>
                        <Tooltip title={t("Public repos")} placement="left">
                            <Fab color="default" size="small" sx={{ mt: 1 }} onClick={() => {}}>
                                <PublicOutlinedIcon onClick={displayRepos}/>
                            </Fab>
                        </Tooltip>
                        <Tooltip title={t("Create my repo")} placement="left">
                            <Fab color="success" size="small" sx={{ mt: 1 }} onClick={() => handleCreateRepoClose()}>
                                <ViewInArIcon/>
                            </Fab>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* 右半部分 */}
                    <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', gap: '32px' }}>
                        <IconButton onClick={() => navigate("/history")} color="primary" sx={{ width: 100, height: 100, borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <EmailIcon fontSize="large" />
                        </IconButton>
                        <IconButton onClick={() => navigate("/history")} color="primary" sx={{ width: 100, height: 100, borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ReplyIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" sx={{ width: 100, height: 100, borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <NotificationsIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" sx={{ width: 100, height: 100, borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <AccessTimeIcon fontSize="large" />
                        </IconButton>
                    </Box>
                    <RightTools/>
                </Grid>
            </Grid>
        </>
    );
};
export default HomePage;