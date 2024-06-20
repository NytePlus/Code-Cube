import {get, getJson, post, SPRINGBOOTURL, upload} from "./common";

export async function getProfile(name){
    let url = `${SPRINGBOOTURL}/user?name=${name}`
    let res
    try{
        res = await getJson(url)
        console.log(res)
    }catch (e){
        console.log(e)
        res = []
    }
    return res
}

export async function changeAvatar(data){
    let url = `${SPRINGBOOTURL}/avatar`
    try{
        await upload(url, data)
    }catch (e){
        console.log(e)
    }
}

export async function changeIntro(data){
    let url = `${SPRINGBOOTURL}/introduction?introduction=${data}`
    try{
        await get(url)
    }catch (e){
        console.log(e)
    }
}