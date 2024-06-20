import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";
import * as React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from "@mui/material/IconButton";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Card from "@mui/material/Card";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import {useNavigate, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Divider from "@mui/material/Divider";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {useEffect, useState} from "react";
import Header from "../component/header";
import {SPRINGBOOTURL} from "../service/common";
import {changeAvatar, changeIntro, getProfile} from "../service/user";
import RightTools from "../component/RightTools";
import {styled} from "@mui/material/styles";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import {Textarea} from "@mui/joy";
import {getAllRepoByUser} from "../service/repo";
import {useAuth} from "../component/AuthProvider";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import {Link} from "@mui/material";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import {useTranslation} from "react-i18next";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function UserPage()
{
    const auth = useAuth()
    const {user} = useParams()
    const { t } = useTranslation();
    const navigate = useNavigate()
    const [profile, setProfile] = useState()
    const [intro, setIntro] = useState("")
    const [repos, setRepos] = useState([])
    const [introEdit, setIntroEdit] = useState(false)

    const getProfileData = async () => {
        let profile = await getProfile(user);
        if (profile === 401)
            navigate('/');
        else {
            setProfile(profile);
            setIntro(profile.introduction);
        }
    };

    const getRepoData = async () => {
        let myRepos = await getAllRepoByUser(user);
        setRepos(myRepos);
    };

    const handleIntroSubmit = () => {
        changeIntro(intro);
        setIntroEdit(false);
        setIntro(intro);
    };

    useEffect(() => {
        getProfileData();
        getRepoData();
    }, []);

    const handleSendMessage = async () => {
        try {
            const params = new URLSearchParams();
            params.append('currentUser', auth.user);
            params.append('otherUser', profile.name);

            const response = await fetch(`${SPRINGBOOTURL}/api/conversations/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // 设置为表单数据类型
                },
                credentials: "include",
                body: params
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const conversation = await response.json();
            navigate(`/history`);
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };


    return (
        profile ? <>
            <Header />
            <RightTools />
            <div style={{marginTop: '3%', marginLeft: '10%', marginRight: '10%', display: 'flex'}}>
                <div style={{width: 300}}>
                    {profile.avatar ?
                        <Avatar sx={{width: 300, height: 300, border: '1px solid #bdbdbd'}} alt="User Avatar"
                                src={`${SPRINGBOOTURL}${profile.avatar}`}/> :
                        <Avatar sx={{width: 300, height: 300}}>{profile.name}</Avatar>}
                    <Typography variant="h5" color="gray " sx={{flexGrow: 1, padding: 1}}>
                        {profile.name}
                    </Typography>
                    <Button variant="contained" fullWidth
                            component="label"
                            role={undefined}
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}>
                        {t("Upload avatar")}
                        <VisuallyHiddenInput type="file" onChange={(e) => changeAvatar(e.target.files[0])}/>
                    </Button>
                    {auth.user !== profile.name && (
                        <Button variant="contained" fullWidth
                                sx={{mt: 2}}
                                onClick={handleSendMessage}>
                            发送私信
                        </Button>
                    )}
                    <br/>
                    <WorkspacePremiumIcon />Loyal reader: achieve<br/>
                    <BadgeOutlinedIcon />Real name authentication: done
                </div>
                <div style={{
                    width: 1000,
                    margin: 20,
                    gap: 15,
                    paddingLeft: 10,
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Card sx={{pl: 3, height: 'min-content'}}>
                        <Box sx={{display: 'flex'}}>
                            <Typography variant="h6" sx={{mt: 1}}>{t("Self Introduction")}</Typography>
                            <Box sx={{flexGrow: 1}}/>
                            {introEdit && <IconButton size="large" color="inherit" onClick={handleIntroSubmit}>
                                <CheckOutlinedIcon />
                            </IconButton>}
                            <IconButton size="large" color="inherit" onClick={() => setIntroEdit(!introEdit)}>
                                {introEdit ? <ClearOutlinedIcon /> : <CreateOutlinedIcon />}
                            </IconButton>
                        </Box>
                        {introEdit ?
                            <Textarea sx={{mr: 2, mb: 1}} onChange={(e) => setIntro(e.target.value)} />
                            :
                            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>{`\`\`\`${profile.introduction}`}</Markdown>}
                    </Card>
                    <Divider>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                padding: 1,
                                border: '1px solid #bdbdbd',
                                display: {xs: 'none', sm: 'block'}
                            }}
                        >
                            {t("My repos")}
                        </Typography>
                    </Divider>
                    <div style={{display: 'grid', gap: 15, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'}}>
                        {repos && repos.map((item) => {
                            return (<Card sx={{pl: 3, minHeight: 150, height: 'min-content'}}>
                                    <div style={{display: 'flex'}}>
                                        <Typography sx={{mt: 1}} variant="h5">{auth.user}/{item.name}</Typography>
                                        <Box sx={{flexGrow: 1}}/>
                                        <IconButton size="large" color="inherit" onClick={() => navigate(`${item.path}`)}>
                                            <CreateOutlinedIcon />
                                        </IconButton>
                                    </div>
                                    <Box sx={{display: 'flex'}}>
                                        <StarOutlineRoundedIcon />
                                        <Box style={{marginLeft: 1, color: "gray"}}>{item.star}</Box>
                                    </Box>
                                    <p style={{color: "gray"}}>{item.introduction}</p>
                                </Card>
                            )
                        })}
                        {/*<Card sx={{pl: 3, minHeight: 150, height: 'min-content'}}>*/}
                        {/*    <div style={{display: 'flex'}}>*/}
                        {/*        <Typography sx={{mt: 1}} variant="h5">New Reciever</Typography>*/}
                        {/*        <Box sx={{flexGrow: 1}}/>*/}
                        {/*        <IconButton size="large" color="inherit">*/}
                        {/*            <AddOutlinedIcon/>*/}
                        {/*        </IconButton>*/}
                        {/*    </div>*/}
                        {/*    <p style={{color: "gray"}}>address</p>*/}
                        {/*    <p style={{color: "gray"}}>phone number</p>*/}
                        {/*</Card>*/}
                    </div>
                </div>
            </div>
        </> : <></>
    )
}
