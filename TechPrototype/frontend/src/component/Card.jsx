import {createContext, useEffect, useRef, useState} from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Card from '@mui/material/Card'
import {Box, IconButton, Typography} from "@mui/material";
import rehypeHighlight from 'rehype-highlight'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import {useFileDispatch} from "../page/RepoPage";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {useAuth} from "./AuthProvider";
import {downloadFile} from "../service/repo";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw";
import {a11yLight, docco} from "react-syntax-highlighter/src/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/light";
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import {FileMarkdown} from "./FileMarkdown";

const style = {
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
}
export const DragCard = ({ index, moveCard, card, id}) => {
    const fileDispatch = useFileDispatch();
    const type = card.title.split('.')[card.title.split('.').length - 1]
    const [shrink, setShrink] = useState(false)
    const auth = useAuth();
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
    const clearClickHandler = () => {
        fileDispatch({
            type: 'delete',
            info: {
                content: card.text
            }
        })
    }

    const downloadHandler = async () => {
        let data = {
            userDTO: {
                name: auth.user,
                password: auth.token
            },
            path: card.path
        }
        await downloadFile(data);
    }

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <Card sx={{height: shrink?300:'min-content', gridColumn: `span ${card.col}`, gridRow: `span ${card.row}`}} ref={preview} style={{...style, opacity}} data-handler-id={handlerId}>
            <div ref={preview} style={{display: 'flex'}}>
                <Typography sx={{mt: 1}} variant="h5">{card.title}</Typography>
                <Box sx={{flexGrow: 1}}/>
                <IconButton size="large" color="inherit" onClick={() => {setShrink(!shrink)}}>
                    <FilterNoneOutlinedIcon/>
                </IconButton>
                <IconButton size="large" color="inherit" onClick={downloadHandler}>
                    <FileDownloadOutlinedIcon/>
                </IconButton>
                <div ref={ref}>
                    <IconButton size="large" color="inherit">
                        <DragHandleIcon sx={{cursor: 'move'}}/>
                    </IconButton>
                </div>
                <IconButton size="large" color="inherit" onClick={clearClickHandler}>
                    <ClearOutlinedIcon/>
                </IconButton>
            </div>
            <FileMarkdown text={card.text} type={type}/>
            {card.child}
        </Card>)
}
