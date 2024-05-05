import {FLASKURL, post} from "./common";

export async function postMessage(message){
    const url = `${FLASKURL}/comment/post`
    let res
    try{
        res = post(url, message)
    }catch(e){
        console.log(e)
        res = {
            ok: false,
            message: "Send message failed."
        }
    }
    return res
}