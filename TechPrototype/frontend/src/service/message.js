import {FLASKURL, post} from "./common";

export async function postAgentMessage(message){
    const url = `${FLASKURL}/conversation/agent`
    let res
    try{
        res = await post(url, message)
    }catch(e){
        console.log(e)
        res = {
            ok: false,
            message: "Send message failed."
        }
    }
    return res
}