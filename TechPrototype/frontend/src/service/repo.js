import {SPRINGBOOTURL, post, getJson} from "./common";

export async function getRepo(data) {
    const url = SPRINGBOOTURL + "/repoGet"
    let res
    try {
        res = await post(url, data)
    } catch (e) {
        console.log(e)
        res = []
    }
    return res
}

export async function getFolder(data) {
    const url = SPRINGBOOTURL + "/folderGet"
    let res
    try {
        res = await post(url, data)
    } catch (e) {
        console.log(e)
        res = []
    }
    return res
}

export async function createRepo(data){
    const url = SPRINGBOOTURL + "/repoCreate"
    console.log(data)
    let res
    try{
        res = await post(url, data)
    }catch(e){
        console.log(e)
        res = []
    }
    return res
}

export async function getAllPublicRepo(){
    const url = SPRINGBOOTURL + "/repoGetAll"
    let res
    try{
        res = await getJson(url)
    }catch(e){
        console.log(e)
        res = []
    }
    return res;
}