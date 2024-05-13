import {TypeAnimation} from "react-type-animation";
import React, {useState} from "react";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import {Box, Button, IconButton, Input, InputLabel, Paper, Typography} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import {FormControl, FormHelperText, TextField} from "@mui/joy";

function FileHeader({title}){
    return (<div style={{display: 'flex'}}>
        <Typography style={{fontFamily: "Courier New", fontSize: 25}}>
            {title}
        </Typography>
        <Box sx={{flexGrow: 1}}/>
        <CreateOutlinedIcon sx={{mr: 1}}/>
        <ClearOutlinedIcon/>
    </div>)
}

export function CodeSide({open, Zoffset}) {
    return (
        <>
            <div style={{
                background: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                transition: "transform 1s ease-out",
                transitionDelay: open ? "0s" : "0.5s",
                transform: open ? `rotateX(-90deg) translateZ(${Zoffset * 1.3}px)`
                    : `rotateX(-90deg) translateZ(${Zoffset * 0.3}px)`
            }} className={'side'}>
                <ViewInArIcon sx={{color: '#eeeeee', fontSize: 200}}/>
            </div>
            <div style={{
                background: 'transparent', overflow: "hidden",
                transition: "transform 1s ease-out",
                transitionDelay: open ? "0s" : "0.5s",
                transform: open ? `rotateX(-90deg) translateZ(${Zoffset * 1.3 + 10}px)` :
                    `rotateX(-90deg) translateZ(${Zoffset * 0.3 + 10}px)`,
            }} className={'side'}>
                <div style={{height: 'min-content', width: 'min-content'}}>
                    {["*******", "**********"].map((item) => {
                        return <div style={{display: 'flex', width: '200px'}}>
                            <FolderOutlinedIcon sx={{mt: 0.5}}/>
                            <Typography sx={{mb: -0.5, whiteSpace: 'nowrap'}} variant="subtitle1">{item}</Typography>
                        </div>
                    })}
                    {["*******", "***********", "************"].map((item) => {
                        return <div style={{display: 'flex', width: '200px'}}>
                            <InsertDriveFileOutlinedIcon sx={{mt: 0.5}}/>
                            <Typography sx={{mb: -0.5, whiteSpace: 'nowrap'}} variant="subtitle1">{item}</Typography>
                        </div>
                    })}
                </div>
            </div>
        </>)
}

const exampleLines0 = ["export function Cube({prop}){\n",
    "...const state = useCube()\n",
    "...return (\n"]
const exampleLien1 = "......<div className={['cube', !state && 'cube-rotate'].join(' ')}>\n"
const exampleLines2 = [".........<FileCube prop={prop}/>\n",
    ".........<LeftSide></LeftSide>\n",
    ".........<TopSide></TopSide>\n",
    ".........<BottomSide></BottomSide>\n",
    ".........<RightSide></RightSide>\n",
    ".........<RightStar/>\n",
    ".........<RightUpload/>\n",
    ".........<RightSet/>\n",
    "......</div>)\n",
    "}"]

export function ExampleSide({open, Zoffset, transform3d, content}) {
    return (
        <>
            <div className={'side'} style={{
                width: open ? "400px" : "100%",
                height: open ? "500px" : "100%",
                background: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                transition: "transform 0.5s ease-out",
                transform: open ? `rotateX(-90deg) translateZ(${Zoffset * 1.3}px) ${transform3d}`
                    : `rotateX(-90deg) translateZ(${Zoffset * 0.3}px)`
            }}>
                {open ? <>{content}</>
                    : <ViewInArIcon sx={{color: '#eeeeee', fontSize: 200}}/>}
            </div>
        </>)
}

export function UploadCodeExample({open, Zoffset}) {
    const transform3d = "translate3d(1000px, -1414px, 1000px) rotateY(45deg) rotateX(45deg) " +
        "translateX(-250px) translateY(-250px)"
    return <ExampleSide open={open} Zoffset={Zoffset} transform3d={transform3d} content={
        <>
            <FileHeader title={"Cube.js"}/>
            {exampleLines0.map((line) => {
                return (<Typography style={{fontFamily: "Courier New", fontSize: 15}}>
                    {line}
                </Typography>)
            })}
            <TypeAnimation
                sequence={[exampleLien1]} wrapper="span" cursor={true}
                style={{fontFamily: "Courier New", fontSize: '10'}}/>
            {exampleLines2.map((line) => {
                return (<Typography style={{fontFamily: "Courier New", fontSize: 15}}>
                    {line}
                </Typography>)
            })}
        </>
    }/>
}

export function DiscussionExample({open, Zoffset}) {
    const transform3d = "translate3d(1000px, -1414px, -1000px) rotateY(-225deg) rotateX(45deg)"
        + "translateX(200px) translateY(-150px)"
    return (<ExampleSide open={open} Zoffset={Zoffset} transform3d={transform3d} content={
        <>
            <FileHeader title={"Chat"}/>
            {exampleLines0.map((line) => {
                return (<Typography style={{fontFamily: "Courier New", fontSize: 15}}>
                    {line}
                </Typography>)
            })}
            <TypeAnimation
                sequence={[exampleLien1]} wrapper="span" cursor={true}
                style={{fontFamily: "Courier New", fontSize: '10'}}/>
            {exampleLines2.map((line) => {
                return (<Typography style={{fontFamily: "Courier New", fontSize: 15}}>
                    {line}
                </Typography>)
            })}
        </>}/>)
}

export function AgentExample({open, Zoffset}) {
    const transform3d = "translate3d(-1000px, -1414px, -1000px) rotateY(-135deg) rotateX(45deg)"
        + "translateX(200px) translateY(150px)"
    return (<ExampleSide open={open} Zoffset={Zoffset} transform3d={transform3d} content={
        <>
            <FileHeader title={"Helped By LLM Agent"}/>
            {exampleLines0.map((line) => {
                return (<Typography style={{fontFamily: "Courier New", fontSize: 15}}>
                    {line}
                </Typography>)
            })}
            <TypeAnimation
                sequence={[exampleLien1]} wrapper="span" cursor={true}
                style={{fontFamily: "Courier New", fontSize: '10'}}/>
            {exampleLines2.map((line) => {
                return (<Typography style={{fontFamily: "Courier New", fontSize: 15}}>
                    {line}
                </Typography>)
            })}
        </>}/>)
}

export function OnlineRepoExample({open, Zoffset}) {
    const transform3d = "translate3d(-1000px, -1414px, 1000px) rotateY(-45deg) rotateX(45deg)"
         + "translateX(-200px) translateY(150px)"
    return (<ExampleSide open={open} Zoffset={Zoffset} transform3d={transform3d} content={
        <>
            <FileHeader title={"Online Repository"}/>
            {exampleLines0.map((line) => {
                return (<Typography style={{fontFamily: "Courier New", fontSize: 15}}>
                    {line}
                </Typography>)
            })}
            <TypeAnimation
                sequence={[exampleLien1]} wrapper="span" cursor={true}
                style={{fontFamily: "Courier New", fontSize: '10'}}/>
            {exampleLines2.map((line) => {
                return (<Typography style={{fontFamily: "Courier New", fontSize: 15}}>
                    {line}
                </Typography>)
            })}
        </>}/>)
}

export function AnimTopSide({open}) {
    return (
        <>
            <div style={{
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', padding: 10,
                background: open?'transparent':"white",
                transform: open ? 'rotateY(180deg) translateZ(-270px) translateY(10px)' :
                    'rotateY(180deg) translateZ(-115px) translateY(10px)'
            }} className={'side'}>
                <IconButton sx={{m: "37%"}} size="large" color="inherit">
                    <ViewInArIcon/>
                </IconButton>
            </div>
            <div className={'side'} style={{
                width: 1, height: 1, marginLeft: '200px',
                background: "transparent",
                transform: open ? 'rotateY(180deg) translateZ(-410px) translateX(10px)' :
                    'rotateY(180deg) translateZ(-110px) translateX(10px)'
            }}>
                {open ? <ReportProblemOutlinedIcon sx={{opacity: 0.5, fontSize: 200, color: '#64b5f6'}}/> : <></>}
            </div>
        </>
    )
}

export function AnimBottomSide({open}) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            padding: 10,
            transition: 'transform 0.5s ease-out',
            transform: open ? 'rotateY(180deg) translateZ(250px) translateY(10px)' :
                'rotateY(180deg) translateZ(110px) translateY(10px)'
        }}>
        </div>
    )
}

export function AnimLeftSide({open}) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            padding: 10,
            transition: 'transform 0.5s ease-out',
            transform: open ? 'rotateY(-90deg) translateZ(180px) rotateZ(90deg) translateX(10px)' :
                'rotateY(-90deg) translateZ(110px) rotateZ(90deg) translateX(10px)'
        }}>
            Side
        </div>
    )
}

export function AnimRightSide({open}) {
    return (
        <>
            <div className={'side'} style={{
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                padding: 10,
                transform: open ? 'rotateY(90deg) translateZ(200px) rotateZ(-90deg) translateX(-10px)' :
                    'rotateY(90deg) translateZ(110px) rotateZ(-90deg) translateX(-10px)'
            }}>
            </div>
            <div className={'side'} style={{
                background: "transparent",
                transform: open ? 'rotateY(90deg) translateZ(260px) rotateZ(-90deg) translateX(-10px)' :
                    'rotateY(90deg) translateZ(160px) rotateZ(-90deg) translateX(-10px)'
            }}>
                <PublicOutlinedIcon sx={{opacity: 0.5, fontSize: 200, color: '#4caf50'}}/>
            </div>
        </>
    )
}

export default function LoginPagePlus() {
    const [rotateZ, setRotateZ] = useState(45)
    const [open, setOpen] = useState(false)
    const commonStyle = {
        fontFamily: 'Courier New',
        fontSize: '1.2em', // 调整字号大小
    };
    const rotateTimer = setInterval(() => {
        if (open) setRotateZ(rotateZ + 85)
        else setRotateZ(rotateZ + 5)
        setOpen(!open)
        clearInterval(rotateTimer)
        console.log(rotateZ)
    }, 5000)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // 处理输入字段变化的函数
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const login = async () => {
        try {
            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username, password: password }),
                credentials: 'include'
            });

            if (response.ok) {
                const isLoggedIn = await response.json();
                console.log('Login status:', isLoggedIn);
                alert(isLoggedIn ? 'Login successful!' : 'Login failed: Invalid username or password');
            } else {
                const errorText = await response.text();
                throw new Error('Server responded with status ' + response.status + ': ' + errorText);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login error: ' + error.message);
        }
    };

    return (<>
        {/*
        <TypeAnimation
            sequence={["Welcome to Code Cube !!!"]}
            wrapper="span"
            cursor={true}
            // repeat={Infinity}
            style={{fontFamily: "Courier New", fontSize: '2em', display: 'inline-block'}}
        />
        */}
        <div style={{paddingLeft: "45%", paddingTop:"15%", position: "fixed"}}>
            <div className={'cube-animation'} style={{
                transition: open ? "transform 5s linear" : "transform 5s ease-out",
                transform: "rotateX(45deg) rotateZ(" + rotateZ + "deg)"}}>
                <AnimLeftSide open={open}/>
                <AnimTopSide open={open}/>
                {[360, 300, 240, 120, 0, -60, -120, -180, -360].map(
                    (offset) => (<CodeSide open={open} Zoffset={offset}/>))}
                <UploadCodeExample open={open} Zoffset={180}/>
                <DiscussionExample open={open} Zoffset={-240}/>
                <AgentExample open={open} Zoffset={60}/>
                <OnlineRepoExample open={open} Zoffset={-300}/>
                <AnimBottomSide open={open}/>
                <AnimRightSide open={open}/>
            </div>
        </div>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)' ,
                    zIndex: 10
                }}
            >
                <Typography variant="h5" sx={{ fontFamily: 'Courier New', fontSize: '2em', textAlign: 'center' }}>
                    <TypeAnimation
                        sequence={["Welcome to Code Cube !!!"]}
                        wrapper="span"
                        cursor={true}
                        style={{ display: 'inline-block' }}
                    />
                </Typography>
                <FormControl variant="outlined" fullWidth sx={commonStyle}>
                    <InputLabel sx={commonStyle} htmlFor="username-input">Username</InputLabel>
                    <Input
                        id="username-input"
                        aria-describedby="username-helper-text"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <FormHelperText id="username-helper-text">Please enter your username.</FormHelperText>
                </FormControl>
                <FormControl variant="outlined" fullWidth sx={commonStyle}>
                    <InputLabel sx={commonStyle} htmlFor="password-input">Password</InputLabel>
                    <Input
                        id="password-input"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        aria-describedby="password-helper-text"
                    />
                    <FormHelperText id="password-helper-text">Please enter your password.</FormHelperText>
                </FormControl>
                <Button variant="contained" onClick={login} sx={commonStyle}>Login</Button>
                <Button sx={commonStyle}>Register</Button>
            </Paper>
        </Box>
    </>)
}