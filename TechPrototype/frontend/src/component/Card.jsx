import {createContext, useRef} from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Card from '@mui/material/Card'
import {Box, IconButton, Typography} from "@mui/material";
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import {useCube, useCubeDispatch} from "./RepoLayout";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

const style = {
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
}
export const DragCard = ({ index, moveCard, card, id}) => {
    const dispatch=useCubeDispatch();
    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag, preview] = useDrag({
        type: 'card',
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const state = useCube();
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    if(card.type === 'cube')
        return (
            <Card sx={{gridColumn: `span ${state?card.col:1}`, gridRow: `span ${state?card.row:2}`}} ref={preview} style={{...style, opacity}} data-handler-id={handlerId}>
                <div ref={preview} style={{display: 'flex'}}>
                    <Typography sx={{mt: 1}} variant="h5">{card.title}</Typography>
                    <Box sx={{flexGrow: 1}}/>
                        <IconButton size="large" color="inherit" onClick={() => {dispatch({type: 'switch'})}}>
                            <ViewInArIcon/>
                        </IconButton>
                    <div ref={ref}>
                        <IconButton size="large" color="inherit">
                            <DragHandleIcon sx={{cursor: 'move'}}/>
                        </IconButton>
                    </div>
                    <IconButton size="large" color="inherit">
                        <ClearOutlinedIcon/>
                    </IconButton>
                </div>
                <Markdown rehypePlugins={[rehypeHighlight]}>{card.text}</Markdown>
                {card.child}
            </Card>
    )
    else
        return (
            <Card sx={{gridColumn: `span ${card.col}`, gridRow: `span ${card.row}`}} ref={preview} style={{...style, opacity}} data-handler-id={handlerId}>
                <div ref={preview} style={{display: 'flex'}}>
                    <Typography sx={{mt: 1}} variant="h5">{card.title}</Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <div ref={ref}>
                        <IconButton size="large" color="inherit">
                            <DragHandleIcon sx={{cursor: 'move'}}/>
                        </IconButton>
                    </div>
                    <IconButton size="large" color="inherit">
                        <ClearOutlinedIcon/>
                    </IconButton>
                </div>
                <Markdown rehypePlugins={[rehypeHighlight]}>{card.text}</Markdown>
                {card.child}
            </Card>)
}
