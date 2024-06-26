import {useAuth} from "./AuthProvider";
import {changeStar, checkStar} from "../service/repo";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import {IconButton, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function StarButton({path, initStar, text}){
    const auth = useAuth()
    const [isStarred, setIsStarred] = useState(false);
    const [star, setStar] = useState(0);

    const initStarred = async () =>{
        let data ={
            userDTO: {name: auth.user, password: auth.token},
            path: path
        }
        let res = await checkStar(data)
        setIsStarred(res);
        setStar(initStar);
    }

    useEffect(() => {
        initStarred()
    }, []);

    const toggleStar = async () => {
        let data ={
            userDTO: {name: auth.user, password: auth.token},
            path: path
        }
        if(await changeStar(data)){
            setStar(isStarred ? star - 1: star + 1)
            setIsStarred(!isStarred)
        }
    };

    return (text?
        <>
            <IconButton sx={{ml: 1}} onClick={() => toggleStar()}>
                {!isStarred ? <StarOutlineRoundedIcon/> : <StarRoundedIcon/>}
            </IconButton>
            <Typography variant="p" sx={{ml:2, mt: 1}}>
                {`${text} ${star}`}
            </Typography>
        </>:
        <>
            <IconButton size="small" edge="end" aria-label="star" onClick={() => toggleStar()}>
                {!isStarred ? <StarOutlineRoundedIcon/> : <StarRoundedIcon/>}
            </IconButton>
            <Typography variant="h6" sx={{mt:0.5, ml:1}}>{star}</Typography>
        </>)
}