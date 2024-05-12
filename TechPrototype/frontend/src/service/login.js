import { SPRINGBOOTURL, post } from "./common";

export async function login(username, password) {
    const url = `${SPRINGBOOTURL}/login`;
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