import update from 'immutability-helper'
import {createContext, useCallback, useContext, useReducer, useState} from 'react'
import { DragCard } from './Card.jsx'
import Cube from "./Cube";
import {transformers_dir} from "./transformers_dir";

const CubeContext = createContext(null);
const CubeDispatchContext = createContext(null);

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

export function useCube() {
    return useContext(CubeContext);
}
export function useCubeDispatch() {
    return useContext(CubeDispatchContext);
}

export const RepoLayout = () => {
    const [cube, dispatch] = useReducer(cubeReducer, false)
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
                child: <div style={{height:400}}>
                    <Cube prop={transformers_dir}/>
                </div>
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
            <CubeContext.Provider value={cube}>
                <CubeDispatchContext.Provider value={dispatch}>
                    <div style={{margin: 15, height:4000, display: 'grid', gap: 15, gridTemplateRows: 'repeat(20, minmax(0, 1fr))', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'}}>
                        {cards.map((card, i) => renderCard(card, i))}
                    </div>
                </CubeDispatchContext.Provider>
            </CubeContext.Provider>
        )
    }
}
