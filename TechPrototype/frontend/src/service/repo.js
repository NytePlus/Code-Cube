import {SPRINGBOOTURL, post, getJson, download, FLASKURL} from "./common";

export async function getRepo(data) {
    const url = SPRINGBOOTURL + "/repoGet"
    let res
    try {
        res = await post(url, data)
    } catch (e) {
        console.error(e)
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
        console.error(e)
        res = []
    }
    return res
}

export async function createRepo(data){
    const url = SPRINGBOOTURL + "/repoCreate"
    let res
    try{
        res = await post(url, data)
    }catch(e){
        console.error(e)
        res = []
    }
    return res
}

export async function createGenerateRepo(data){
    const url = FLASKURL + "/repoCreate/agent"
    let res
    try{
        res = await post(url, data)
    }catch(e){
        console.error(e)
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
        console.error(e)
        res = []
    }
    return res;
}

export async function getRepoByFilter(data){
    const url = SPRINGBOOTURL + "/repoFilter"
    let res
    try{
        res = await post(url, data)
    }catch(e){
        console.error(e)
        res = []
    }
    return res;
}

export async function getAllRepoByUser(data){
    const url = SPRINGBOOTURL + `/repoGetByUser?target=${data}`
    let res
    try{
        res = await getJson(url)
    }catch(e){
        console.error(e)
        res = []
    }
    return res;
}

export async function getFile(data){
    const url = SPRINGBOOTURL + "/fileGet"
    let res
    try {
        res = await post(url, data)
    }catch (e){
        console.error(e)
        res = []
    }
    return res;
}

export async function downloadFile(data){
    const url = SPRINGBOOTURL + "/fileDownload"
    try {
        await download(url, data)
    }catch (e){
        console.error(e)
    }
}

export async function downloadRepo(data){
    const url = SPRINGBOOTURL + "/repoDomwload"
    try {
        await download(url, data)
    }catch (e){
        console.error(e)
    }
}

export async function changeStar(data){
    const url = SPRINGBOOTURL + '/repoStar'
    let res
    try {
        res = await post(url, data)
    }catch (e){
        console.error(e)
        res = false
    }
    return res
}

export async function checkStar(data){
    const url = SPRINGBOOTURL + '/repoStarCheck'
    let res
    try {
        res = await post(url, data)
    }catch (e){
        console.error(e)
        res = false
    }
    return res
}