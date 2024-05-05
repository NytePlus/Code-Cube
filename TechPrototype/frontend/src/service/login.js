import { SPRINGBOOTURL, post } from "./common";

export async function login(username, password) {
    const url = `${SPRINGBOOTURL}/login?username=${username}&password=${password}`;
    let result;
    try {
        result = await post(url, { name: username, password: password });
    } catch (e) {
        console.log(e);
        result = false;
    }
    return result;
}