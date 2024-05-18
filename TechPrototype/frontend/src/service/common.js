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
    return res
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

export async function download(url, data){
    let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(
                new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                data.path.split('/')[data.path.split('/').length - 1],
            );

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
        }).catch(error => {
            console.error(error)
        })
    return res;
}

export const SPRINGBOOTURL = 'http://localhost:8081';
export const FLASKURL = "http://localhost:8890";