import {useState, createContext, useContext, useReducer} from 'react'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, IconButton, Typography} from "@mui/material";
import {useCube} from "./RepoLayout";

const LayersContext = createContext(null);
const LayersDispatchContext = createContext(null);
const PreviewContext = createContext(null);
const PreviewDispatchContext = createContext(null);

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
    const [transform3d, setTransform3d] = useState('')
    const [background, setBackground] = useState('')
    const [overflow, setOverflow] = useState('hidden')
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
    const [display, setDisplay] = useState(false)
    if(dir && dir.files.length >= 0)
        return (
            <div style={{width: '100%',
                height: '100%',
                padding: 10,
                overflow: `${dir.path !== preview?overflow:''}`,
                position: 'absolute',
                border: '1px solid #000',
                transform: `rotateX(-90deg) translateZ(${Zoffset}px) ${transform3d}`}}
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
    return (
        <div style={{width: '100%',
            height: '100%',
            position: 'absolute',
            border: '1px solid #000',
            padding: 10,
            transform: 'rotateY(-90deg) translateZ(100px) rotateZ(90deg) translateX(20px) translateY(-15px)'}}>
            Side
        </div>
    )
}

function BottomSide()
{
    return (
        <div style={{width: '100%',
            height: '100%',
            position: 'absolute',
            border: '1px solid #000',
            padding: 10,
            transform: 'rotateY(180deg) translateZ(125px) translateX(10px)'}}>
            Side
        </div>
    )
}

function RightSide()
{
    return (
        <div style={{width: '100%',
            height: '100%',
            position: 'absolute',
            border: '1px solid #000',
            padding: 10,
            transform: 'rotateY(90deg) translateZ(110px) rotateZ(-90deg) translateX(-10px)'}}>
            Side
        </div>
    )
}
export function useLayers() {
    return useContext(LayersContext);
}
export function useLayersDispatch() {
    return useContext(LayersDispatchContext);
}
export function usePreview() {
    return useContext(PreviewContext);
}
export function usePreviewDispatch() {
    return useContext(PreviewDispatchContext);
}

function previewReducer(preview, action){
    switch (action.type){
        case 'preview':
        {
            return action.info.layer + '/' + action.info.name
        }
        case 'endpreview':
        {
            return ''
        }
        default:
        {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
function layersReducer(layers, action) {
    switch (action.type) {
        case 'changed':
        {
            // Cannot Change layers directly in reducer!
            let i = layers.length - 1
            while(i > 0 && layers[i] !== action.info.layer)
                i --
            return [...layers.slice(0, i + 1), action.info.layer + '/' + action.info.name]
        }
        case 'remove':
        {
            // Cannot Change layers directly in reducer!
            let i = layers.length - 1
            while(i > 0 && layers[i] !== action.info.layer)
                i --
            return [...layers.slice(0, i + 1)]
        }
        default:
        {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

function FileFlat({dir})
{
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
        width: '100%', height: '100%', overflow: 'scroll', align: 'begin'
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

function Cube({prop}) {
    const state = useCube();
    const [layers, dispatch] = useReducer(layersReducer, ['F:/PycharmProjects/transformers']);
    const [preview, previewDispatch] = useReducer(previewReducer, '');
        return (<LayersContext.Provider value={layers}>
            <LayersDispatchContext.Provider value={dispatch}>
                <PreviewContext.Provider value={preview}>
                    <PreviewDispatchContext.Provider value={previewDispatch}>
                    {
                        state?
                            <div style={{paddingLeft: '30%', paddingTop: '20%'}}>
                                <div className='cube'>
                                    <FileCube prop={prop}/>
                                    <LeftSide></LeftSide>
                                    <BottomSide></BottomSide>
                                    <RightSide></RightSide>
                                </div>
                            </div>:
                        <FileFlat dir={prop.find(item => item.path === layers[layers.length - 1])}></FileFlat>
                    }
                    </PreviewDispatchContext.Provider>
                </PreviewContext.Provider>
            </LayersDispatchContext.Provider>
        </LayersContext.Provider>)
}

function FileCube({prop}) {
    const layers = useLayers()
    const preview = usePreview()
    return (
        <>
            {layers.map((path, index) => {
                return (<FileSide dir={prop.find(item => item.path === path)} Zoffset={-400 / layers.length * index + 200}></FileSide>)
            })}
            {
                preview !== '' ? <FileSide dir={prop.find(item => item.path === preview)} Zoffset={-200}>Preview</FileSide> :
                    <FileSide dir={{path: '', files: []}} Zoffset={-200}>Preview</FileSide>
            }
        </>
    )
}

export default Cube