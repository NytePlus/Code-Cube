export async function getJson(url){
    let res = await fetch(url, {
        method: "GET",
        credentials: "include" //both same-origin and cross-origin
    });
    return res.json();
}

export async function get(url){
    let res = await fetch(url, {
        method: "GET",
        credentials: "include"
    });
    return res;
}

export async function put(url, data){
    let res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: "include"
    })
    return res.json();
}

export async function del(url, data){
    let res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(data)
    })
    return res.json();
}

export async function post(url, data){
    let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    });
    return res.json();
}

export const SPRINGBOOTURL = 'http://localhost:8080';
export const FLASKURL = "http://202.120.6.211:13000";