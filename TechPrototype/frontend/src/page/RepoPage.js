import update from 'immutability-helper'
import React, {createContext, useCallback, useContext, useReducer, useState} from 'react'
import { DragCard } from '../component/Card.jsx'
import {transformers_dir} from "../source/transformers_dir";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {Cube, FileFlat} from "../component/Cube";
import Header from "../component/header";
import {IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AndroidIcon from "@mui/icons-material/Android";
import ForumIcon from "@mui/icons-material/Forum";

const CubeContext = createContext(null);
const CubeDispatchContext = createContext(null);
const LayersContext = createContext(null);
const LayersDispatchContext = createContext(null);
const PreviewContext = createContext(null);
const PreviewDispatchContext = createContext(null);


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
function cubeReducer(cube, action)
{
    switch (action.type){
        case 'switch':
        {
            return !cube
        }
        default:
        {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const RepoPage = () => {
    const [data, setData] = useState(transformers_dir)
    const [cube, dispatch] = useReducer(cubeReducer, false)
    const [layers, layerDispatch] = useReducer(layersReducer, ['F:/PycharmProjects/transformers']);
    const [preview, previewDispatch] = useReducer(previewReducer, '');
    // eslint-disable-next-line no-lone-blocks
    {
        const [cards, setCards] = useState([
            {
                id: 1,
                type: 'file',
                title: '',
                text: 'Write a cool JS library',
                row: 1,
                col: 2,
                child: <></>
            },
            {
                id: 2,
                type: 'file',
                title: '',
                text: 'Make it generic enough',
                row: 1,
                col: 2,
                child: <></>
            },
            {
                id: 3,
                type: 'cube',
                text: '',
                row: 3,
                col: 2,
                child:
                    <FileFlat dir={data.find(item => item.path === layers[layers.length - 1])}/>
            },
            {
                id: 4,
                type: 'file',
                title: '',
                text: 'Make it generic enough',
                row: 1,
                col: 2,
                child: <></>
            },
        ])
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

        return (
            <DndProvider backend={HTML5Backend}>
                <CubeContext.Provider value={cube}>
                    <CubeDispatchContext.Provider value={dispatch}>
                        <LayersContext.Provider value={layers}>
                            <LayersDispatchContext.Provider value={layerDispatch}>
                                <PreviewContext.Provider value={preview}>
                                    <PreviewDispatchContext.Provider value={previewDispatch}>
                                        <Header/>
                                        <div style={{height: 500, paddingLeft: '45%', paddingTop: '15%'}}>
                                            <Cube prop={data}/>
                                        </div>
                                        <SpeedDial
                                            ariaLabel="SpeedDial openIcon example"
                                            sx={{position: 'absolute', bottom: 16, right: 16}}
                                            icon={<SpeedDialIcon openIcon={<ExpandMoreIcon/>}/>}
                                        >
                                            <SpeedDialAction key={"Agent"} icon={<AndroidIcon/>}
                                                             tooltipTitle={"Agent"}/>
                                            <SpeedDialAction key={"Forum"} icon={<ForumIcon/>}
                                                             tooltipTitle={"Fourm"}/>
                                        </SpeedDial>
                                        <div style={{
                                            margin: 15,
                                            height: 4000,
                                            display: 'grid',
                                            gap: 15,
                                            gridTemplateRows: 'repeat(20, minmax(0, 1fr))',
                                            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
                                        }}>
                                            {cards.map((card, i) => renderCard(card, i))}
                                        </div>
                                    </PreviewDispatchContext.Provider>
                                </PreviewContext.Provider>
                            </LayersDispatchContext.Provider>
                        </LayersContext.Provider>
                    </CubeDispatchContext.Provider>
                </CubeContext.Provider>
            </DndProvider>
        )
    }
};

export default RepoPage;