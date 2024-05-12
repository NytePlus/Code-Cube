import {post, SPRINGBOOTURL} from '../service/common'

export async function signup(username, password){
    const url = `${SPRINGBOOTURL}/signup`;
    let result;
    try {
        console.log({name:username, password:password})
        result = await post(url, { name: username, password: password });
    } catch (e) {
        console.log(e);
        result = false;
    }
    return result;
}