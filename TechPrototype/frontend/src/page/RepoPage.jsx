import update from 'immutability-helper'
import React, {createContext, useCallback, useContext, useEffect, useReducer, useState} from 'react'
import { DragCard } from '../component/Card.jsx'
import {transformers_dir} from "../source/transformers_dir";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {Cube, FileFlat} from "../component/Cube";
import Header from "../component/header";
import RightTools from "../component/RightTools";
import {useNavigate, useParams} from "react-router-dom";
import {downloadFile, downloadRepo, getFile, getFolder, getRepo} from "../service/repo";
import {useAuth} from "../component/AuthProvider";
import {Avatar, Box, Button, IconButton, Typography} from "@mui/material";
import {SPRINGBOOTURL} from "../service/common";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Timeline from "@mui/lab/Timeline";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Divider from "@mui/material/Divider";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {Upload} from "antd";
import {FileMarkdown} from "../component/FileMarkdown";
import StarButton from "../component/StarButton";

const CubeContext = createContext(null);
const CubeDispatchContext = createContext(null);
const LayersContext = createContext(null);
const LayersDispatchContext = createContext(null);
const PreviewContext = createContext(null);
const PreviewDispatchContext = createContext(null);
const RepoContext = createContext(null);
const FileContext = createContext(null);
const FileDispatchContext = createContext(null);

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

export function useCube() {
    return useContext(CubeContext);
}
export function useCubeDispatch() {
    return useContext(CubeDispatchContext);
}

export function useRepo(){
    return useContext(RepoContext)
}

export function useFile(){
    return useContext(FileContext)
}

export function useFileDispatch(){
    return useContext(FileDispatchContext)
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

function filePreviewReducer(filePreview, action){
    switch(action.type){
        case 'preview':
        {
            return action.file
        }
        case 'endpreview':
        {
            return null
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
function cubeReducer(cube, action)
{
    switch (action.type){
        case 'switch':
        {
            return !cube
        }
        case 'open':
        {
            return true
        }
        case 'close':
        {
            return false
        }
        default:
        {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

function fileReducer(files, action)
{
    console.log(action)
    switch (action.type){
        case 'add':
        {
            return [...files, action.info]
        }
        case 'delete':
        {
            return files.filter((item) => item.content !== action.info.content)
        }
        default:
        {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const RepoPage = () => {
    const userRepo = useParams()
    const auth = useAuth()
    const navigate = useNavigate()
    const [repoData, setRepoData] = useState([])
    const [folder, setFolder] = useState([])
    const [cube, dispatch] = useReducer(cubeReducer, false)
    const [files, fileDispatch] = useReducer(fileReducer, [])
    const [cards, setCards] = useState([])
    const [layers, layerDispatch] = useReducer(layersReducer, ["/" + userRepo.user + '/' + userRepo.repo]);
    const [preview, previewDispatch] = useReducer(previewReducer, '');
    const [filePreview, filePreviewDispatch] = useReducer(filePreviewReducer, '');

    const getRepoData = async () =>{
        dispatch({type: 'close'})
        let data = {
            userDTO: {
                name: auth.user,
                password: auth.token
            },
            path: "/" + userRepo.user + '/' + userRepo.repo}
        console.log(data.path)
        let repo = await getRepo(data)
        let folder = await getFolder(data)
        setRepoData(repo)
        setFolder([folder])
        dispatch({type: 'open'})
    }

    useEffect(() => {
        getRepoData()
    }, [])

    useEffect(() => {
        setCards(files.map((item, index) => {
            return {
                id: index,
                title: item.name,
                path: item.path,
                text: item.content,
                type: item.type,
                row: 3,
                col: 2,
                child: <></>
            }
        }))
    }, [files])
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }),
        )
    }, [])
    const renderCard = useCallback((card, index) => {
        return (
                <DragCard
                    card={card}
                    index={index}
                    moveCard={moveCard}
                    id={card.id}
                />
        )
    }, [moveCard])

    const downloadHandler = async () => {
        let data = {
            userDTO: {
                name: auth.user,
                password: auth.token
            },
            path: repoData.path
        }
        await downloadRepo(data);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <RepoContext.Provider value={{repoData, userRepo}}>
                <CubeContext.Provider value={cube}>
                    <CubeDispatchContext.Provider value={dispatch}>
                        <LayersContext.Provider value={layers}>
                            <LayersDispatchContext.Provider value={layerDispatch}>
                                <PreviewContext.Provider value={preview}>
                                    <PreviewDispatchContext.Provider value={{filePreviewDispatch, previewDispatch}}>
                                        <FileContext.Provider value={files}>
                                            <FileDispatchContext.Provider value={fileDispatch}>
                                                <div style={{overflowX: 'hidden'}}>
                                                    <Header/>
                                                    <Box sx={{display: 'flex'}}>
                                                        <Box sx={{m:2, maxWidth: 300, position: 'absolute'}}>
                                                            {filePreview &&<FileMarkdown
                                                                text={filePreview.content}
                                                                type={filePreview.name.split('.')[filePreview.name.split('.').length - 1]}/>}
                                                        </Box>
                                                        <div style={{
                                                            flexGrow: 1,
                                                            height: 500,
                                                            paddingLeft: '45%',
                                                            paddingTop: '15%'
                                                        }}>
                                                            <Cube prop={folder}/>
                                                        </div>
                                                        {repoData && repoData.initUser && <Box sx={{w: 100, m: 3}}>
                                                            <Box sx={{display: 'flex'}}>
                                                                <Typography color="gray" variant="h4" sx={{mt: 2, mr: 2}}>
                                                                    {repoData.initUser.name + '/' + repoData.name}
                                                                </Typography>
                                                                <Box sx={{flexGrow: 1}}></Box>
                                                                <Avatar sx={{
                                                                    width: 150,
                                                                    height: 150,
                                                                    border: '1px solid #bdbdbd'
                                                                }}
                                                                        onClick={() => {navigate('/' + repoData.initUser.name + '/profile')}}
                                                                         alt={repoData.initUser.name}
                                                                         src={SPRINGBOOTURL + repoData.initUser.avatar}/>
                                                            </Box>
                                                            <Typography variant="h4" sx={{mt: 1}}>
                                                                About
                                                            </Typography>
                                                            <About repoData={repoData} folder={folder}/>
                                                            <Typography variant="p" sx={{ml: 2, mb: 2}}>
                                                                {repoData.introduction}
                                                            </Typography>
                                                            <Divider/>
                                                            <Typography variant="h4" sx={{mt: 1}}>
                                                                Settings
                                                            </Typography>
                                                            <StarButton path={repoData.path} initStar={repoData.star} text={"stars"}/>
                                                            <Box sx={{display: 'flex'}}>
                                                                <IconButton sx={{ml: 1}} onClick={downloadHandler}>
                                                                    <FileDownloadOutlinedIcon/>
                                                                </IconButton>
                                                                <Typography variant="p" sx={{ml:2, mt: 1}}>
                                                                    下载项目文件压缩包
                                                                </Typography>
                                                            </Box>
                                                            <Box sx={{display: 'flex'}}>
                                                                <Upload
                                                                    multiple={true}
                                                                    action={SPRINGBOOTURL + '/fileUpload'}
                                                                    withCredentials="true"
                                                                    data={file => {
                                                                        return {user: auth.user, repo: repoData.name, path: file["webkitRelativePath"]}}}
                                                                    directory>
                                                                    <Button><DriveFolderUploadOutlinedIcon/></Button>
                                                                </Upload>
                                                                <Typography variant="p" sx={{mt: 1}}>
                                                                    上传文件目录
                                                                </Typography>
                                                            </Box>
                                                        </Box>}
                                                    </Box>
                                                    <div style={{
                                                        marginLeft: 30,
                                                        marginRight: 30,
                                                        marginBottom: 40,
                                                        display: 'grid',
                                                        gap: 15,
                                                        // gridTemplateRows: 'repeat(20, minmax(0, 1fr))',
                                                        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
                                                    }}>
                                                        {cards.map((card, i) => renderCard(card, i))}
                                                    </div>
                                                    <RightTools/>
                                                </div>
                                            </FileDispatchContext.Provider>
                                        </FileContext.Provider>
                                    </PreviewDispatchContext.Provider>
                                </PreviewContext.Provider>
                            </LayersDispatchContext.Provider>
                        </LayersContext.Provider>
                    </CubeDispatchContext.Provider>
                </CubeContext.Provider>
            </RepoContext.Provider>
        </DndProvider>
    )
};

const About = ({repoData, folder}) => {
    return (<Timeline position="alternate">
        <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
                {repoData.star}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>star</TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
                {repoData.date}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>创建时间</TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
                {repoData.publish?"公开":"私有"}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>仓库状态</TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
                {size(folder[0])} bytes
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>文件大小</TimelineContent>
        </TimelineItem>
    </Timeline>)
}

function size(prop){
    let res = 0;
    for(let i = 0; i < prop.folderList.length; i ++){
        res += size(prop.folderList[i])
    }
    for(let i = 0; i < prop.fileList.length; i ++){
        res += prop.fileList[i].size
    }
    return res
}

export default RepoPage;