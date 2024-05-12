import {Box, IconButton, Input, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AndroidIcon from "@mui/icons-material/Android";
import ForumIcon from "@mui/icons-material/Forum";
import React, {useState} from "react";
import moment from "moment/moment";
import {postMessage} from "../service/message";
import {useAuth} from "./AuthProvider";
import {useInstruction} from "./InstructionProvider";
import Card from "@mui/material/Card";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import {useNavigate} from "react-router-dom";

function RightTools(){
    const auth = useAuth()
    const navigate = useNavigate()
    const instr = useInstruction()
    const [input, setInput] = useState('')
    const [agentOpen, setAgentOpen] = useState(false);

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
        instr.excute(['cd /repo'])
        console.log(res)
    }

    const handleAgentChange = (event) => {
        setAgentOpen(!agentOpen);
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 50, right: 20, display: 'flex', flexDirection: 'column' }}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon openIcon={<ExpandMoreIcon />} />}
            >
                <SpeedDialAction key={"Agent"} icon={<AndroidIcon />}
                                 tooltipTitle={"Agent"} onClick={handleAgentChange}/>
                <SpeedDialAction key={"Forum"} icon={<ForumIcon />}
                                 tooltipTitle={"Fourm"}/>
                <SpeedDialAction key={"Home"} icon={<HomeOutlinedIcon />} onClick={() => navigate(`/${auth.user}`)}
                                 tooltipTitle={"Home"}/>
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
        </Box>)
}

export default RightTools