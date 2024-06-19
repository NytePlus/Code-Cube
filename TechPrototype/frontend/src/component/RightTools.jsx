import {Avatar, Box, IconButton, Input, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AndroidIcon from "@mui/icons-material/Android";
import ForumIcon from "@mui/icons-material/Forum";
import React, {useState} from "react";
import moment from "moment/moment";
import {postAgentMessage} from "../service/message";
import {useAuth} from "./AuthProvider";
import {useInstruction} from "./InstructionProvider";
import Card from "@mui/material/Card";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import {useNavigate} from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {ChatBox, ReceiverMessage, SenderMessage} from "mui-chat-box";
import {Textarea} from "@mui/joy";

function RightTools(){
    const auth = useAuth()
    const navigate = useNavigate()
    const instr = useInstruction()
    const [input, setInput] = useState('')
    const [agentOpen, setAgentOpen] = useState(false);
    const [history, setHistory] = useState([]);

    const handleInputChange = (event) => {
        setInput(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setHistory((preHistory) => [...preHistory, {user: 'user', text: input}])
        const message = {
            path: '/conversation/agent',
            content: input,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            user: auth.user
        }
        setInput('')
        const res = await postAgentMessage(message)
        setHistory((preHistory) => [...preHistory, {user: 'agent', text: res.reply}])

        let instrs = []
        let instrbegin = false
        for(let i = 0; res.reply && i < res.reply.length; i ++)
        {
            if(!instrbegin && (res.reply.substring(i, 2) === 'cd' || res.reply.substring(i, 5) === 'mkdir'))
            {
                instrbegin = true;
                instrs.push(res.reply[i])
            }
            else if(instrbegin && res.reply[i] === '\n')
            {
                instrbegin = false;
            }
            else if(instrbegin)
            {
                instrs[instrs.length - 1] += res.reply[i]
            }
        }
        instr.excute(instrs)
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
                                 tooltipTitle={"Fourm"} onClick={() => navigate("/history")}/>
                <SpeedDialAction key={"Home"} icon={<HomeOutlinedIcon />} onClick={() => navigate(`/${auth.user}`)}
                                 tooltipTitle={"Home"}/>
                <SpeedDialAction key={"Back to top"} icon={<KeyboardArrowUpIcon />}
                                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                 tooltipTitle={"Back to top"}/>
            </SpeedDial>
            {agentOpen && <Card sx={{mr: 10, width: 400}}>
                <div style={{display: 'flex'}}>
                    <Typography sx={{mt: 1}} variant="h5"></Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <IconButton size="large" color="inherit" onClick={() => setAgentOpen(false)}>
                        <ClearOutlinedIcon/>
                    </IconButton>
                </div>
                <Box sx={{height:400, overflowY: "scroll"}}>
                    <ChatBox>
                        {history.map((item) => {
                            return (item.user === 'user' ?
                                <SenderMessage sx={{wordBreak: "break-all"}} avatar={<Avatar></Avatar>}>
                                    {item.text}
                                </SenderMessage>:
                                <ReceiverMessage sx={{wordBreak: "break-all"}} avatar={<Avatar>:D</Avatar>}>
                                    {item.text}
                                </ReceiverMessage>)
                        })}
                    </ChatBox>
                </Box>
                <div style={{display: 'flex'}}>
                    <Textarea value={input} sx={{maxHeight: 180, ml: 2, mb: 0.5, mt: 0.5, width:"100%"}} onChange={handleInputChange}/>
                    <IconButton type="submit" onMouseDown={handleSubmit} sx={{height: 45, p: '10px'}}>
                        <TelegramIcon/>
                    </IconButton>
                </div>
            </Card>
            }
        </Box>)
}

export default RightTools