import React, {useState, createContext, useContext, useReducer, Component, createRef, memo, useMemo} from 'react'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, Button, IconButton, Typography} from "@mui/material";
import {useCube, useCubeDispatch, useLayers, useLayersDispatch, usePreview, usePreviewDispatch} from "../page/RepoPage";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

function File({item})
{
    return (<div style={{display: 'flex'}}>
        <InsertDriveFileOutlinedIcon sx={{mt:0.5}}/>
        <Typography sx={{mb:-0.5, whiteSpace:'nowrap'}} variant="subtitle1">{item.name}</Typography>
    </div>)
}

function Folder({name, layer, display, setDisplay})
{
    const dispatch = useLayersDispatch();
    const previewDispatch = usePreviewDispatch();
    function onMouseEnterHandler()
    {
        previewDispatch({type: 'preview',
            info: {
                layer: layer,
                name: name,
            }
        });
    }
    function onMouseLeaveHandler()
    {
        previewDispatch({type: 'endpreview',
            info: {
                layer: layer,
                name: name,
            }
        });
    }
    function onMouseDownHandler()
    {
        if(!display)
        {
            setDisplay(true)
            dispatch({type: 'changed',
                info: {
                    layer: layer,
                    name: name,
                }
            })
        }
        else
        {
            setDisplay(false)
            dispatch({type: 'remove',
                info: {
                    layer: layer,
                    name: name,
                }
            })
        }
    }
    return (<div style={{display: 'flex'}}
                 onMouseEnter={() => onMouseEnterHandler()} onMouseLeave={() => onMouseLeaveHandler()}
                 onMouseDown={() => onMouseDownHandler()}>
        <FolderOutlinedIcon sx={{mt:0.5}}/>
        <Typography sx={{mb:-0.5, whiteSpace:'nowrap'}} variant="subtitle1">{name}</Typography>
    </div>)
}
function FileSide({dir, Zoffset})
{
    const state = useCube()
    const [transform3d, setTransform3d] = useState('')
    const [background, setBackground] = useState('')
    const [overflow, setOverflow] = useState('hidden')
    const [display, setDisplay] = useState(false)
    const preview = usePreview()
    function onMouseEnterHandler()
    {
        setTransform3d('translate3d(1000px, -1414px, 1000px)')
        setBackground('#ffffffe6')
        setOverflow('')
    }
    function onMouseLeaveHandler()
    {
        setTransform3d('')
        setBackground('')
        if(dir.path !== preview) setOverflow('hidden')
    }
    if(dir && dir.files.length >= 0)
        return (
            <div style={{width: '100%', height: '100%', padding: 10, background: 'white',
                overflow: `${dir.path !== preview?overflow:''}`, position: 'absolute', border: '1px solid #000',
                transform: state ? `rotateX(-90deg) translateZ(${Zoffset}px) ${transform3d}` :
                    `rotateX(-90deg) translateZ(${Zoffset * 0.6}px) ${transform3d}`,
                transition: 'transform 0.5s ease-out'}}
                 onMouseEnter={() => onMouseEnterHandler()} onMouseLeave={() => onMouseLeaveHandler()}>
                <div style={{height: 'min-content', width:'min-content', background: `${background}`}}>
                    {(dir.path !== preview)? <Typography sx={{mb:-0.5, whiteSpace:'nowrap'}} variant="h6">{dir.path}</Typography>:
                        <Typography sx={{mb:-0.5, whiteSpace:'nowrap'}} variant="h6">Preview</Typography>}
                    {dir.files.map((item) => {
                        if(item.type === 'file')
                            return <File item={item}/>
                        else
                            return <Folder name={item.name} layer={dir.path} display={display} setDisplay={setDisplay}/>
                    })}
                </div>
            </div>
        )
}

function LeftSide()
{
    const state = useCube();
    return (
        <div style={{width: '100%',
            height: '100%',
            position: 'absolute',
            border: '1px solid #000',
            padding: 10,
            transition: 'transform 0.5s ease-out',
            transform: state ? 'rotateY(-90deg) translateZ(180px) rotateZ(90deg) translateX(20px) translateY(-15px)' :
                'rotateY(-90deg) translateZ(100px) rotateZ(90deg) translateX(20px) translateY(-15px)'}}>
            Side
        </div>
    )
}

function BottomSide()
{
    const state = useCube();
    return (
        <div style={{width: '100%',
            height: '100%',
            position: 'absolute',
            border: '1px solid #000',
            padding: 10,
            transition: 'transform 0.5s ease-out',
            transform: state ? 'rotateY(180deg) translateZ(250px) translateX(10px)' :
                'rotateY(180deg) translateZ(125px) translateX(10px)'}}>
        </div>
    )
}

function TopSide()
{
    const state = useCube();
    const dispatch = useCubeDispatch();
    return (
        <div style={{width: '100%',
            height: '100%',
            position: 'absolute',
            border: '1px solid #000',
            padding: 10,
            transition: 'transform 0.5s ease-out',
            transform: state ? 'rotateY(180deg) translateZ(-250px) translateX(10px)' :
                'rotateY(180deg) translateZ(-115px) translateX(10px)'}}>
            <IconButton sx={{m: "37%"}}size="large" color="inherit" onClick={() => {dispatch({type: 'switch'})}}>
                <ViewInArIcon/>
            </IconButton>
        </div>
    )
}

function RightSide()
{
    const state = useCube();
    return (
        <div style={{width: '100%',
            height: '100%',
            position: 'absolute',
            border: '1px solid #000',
            padding: 10,
            transition: 'transform 0.5s ease-out',
            transform: state ? 'rotateY(90deg) translateZ(200px) rotateZ(-90deg) translateX(-10px)' :
                'rotateY(90deg) translateZ(110px) rotateZ(-90deg) translateX(-10px)'}}>
            Side
        </div>
    )
}

export function FileFlat({dir})
{
    const state = useCube()
    const [display, setDisplay] = useState(true)
    const dispatch = useLayersDispatch();
    function back()
    {
        dispatch({type: 'remove',
            info: {
                layer: dir.path.split('/').slice(0, -1).join('/'),
                name: '',
            }
        })
    }
    return (<div style={{
        width: '100%', height: '100%', overflow: 'scroll', align: 'begin',
        transition: 'opacity 0.5s ease-out', opacity: state ? '0': '1', background: "white"
    }}>
        <div style={{display: 'flex'}}>
            <Typography sx={{mb: -0.5, whiteSpace: 'nowrap'}} variant="h6">{dir.path}</Typography>
            <Box sx={{flexGrow: 1}}/>
        </div>
        <div style={{display: 'flex'}}>
            <IconButton size="large" color="inherit" onClick={back}>
                <ArrowBackIcon/>
            </IconButton><Box sx={{flexGrow: 1}}/>
        </div>
        {dir.files.map((item) => {
            if (item.type === 'file')
                return <File item={item}/>
            else
                return <Folder name={item.name} layer={dir.path} display={display} setDisplay={setDisplay}/>
        })}
    </div>)
}

export function Cube({prop}){
    const state = useCube()
    return (
        <div className={['cube', !state && 'cube-rotate'].join(' ')}>
            <FileCube prop={prop}/>
            <LeftSide></LeftSide>
            <TopSide></TopSide>
            <BottomSide></BottomSide>
            <RightSide></RightSide>
        </div>)
}

function FileCube({prop}) {
    const layers = useLayers()
    const preview = usePreview()
    return (
        <>
            {layers.map((path, index) => {
                return (<FileSide dir={prop.find(item => item.path === path)}
                                  Zoffset={-400 / layers.length * index + 200}></FileSide>)
            })}
            {
                preview !== '' ? <FileSide dir={prop.find(item => item.path === preview)} Zoffset={-200}>Preview</FileSide> :
                    <FileSide dir={{path: '', files: []}} Zoffset={-200}>Preview</FileSide>
            }
        </>
    )
}