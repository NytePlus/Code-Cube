let cube = document.getElementById("cube");
let folders = cube.getElementsByClassName("iconTextPair");

function getSublayer(layer)
{
    let layerId = layer.parentElement.id;
    let subLayer = document.getElementById(`${layerId}/${layer.getAttribute("name")}`);
    return subLayer;
}

function displaySublayer(layer){
    subLayer = getSublayer(layer);
    if(subLayer) subLayer.style.visibility = 'visible';
}
function hideSublayer(layer){
    subLayer = getSublayer(layer);
    if(subLayer) subLayer.style.visibility = 'hidden';
}
function highlightLayer(layer){
    layer.className = `side-highlight ${layer.getAttribute("class").split(' ')[1]}-highlight`;
}
function lightoutLayer(layer){
    layer.className = `side ${layer.getAttribute("class").split(' ')[1].split('-h')[0]}`;
}

function onmouseoverFunctionFolder(){
    displaySublayer(this);
}
function onmouseoutFunctionFolder(layer) {
    hideSublayer(this);
}

function onmouseoverFunctionLayer(){
    highlightLayer(this);
}
function onmouseoutFunctionLayer(){
    lightoutLayer(this);
}
function onclickFunctionFolder() {
    let folders = this.parentNode.children;
    if (this.select == false) {
        displaySublayer(this);
        this.onmouseout = this.onmouseover = function () {}
        this.select = true;
        this.className = "iconTextPair";
        for (let i = 0; i < folders.length; i++)
            if (folders[i] != this){
                hideSublayer(folders[i]);
                folders[i].onmouseout = folders[i].onmouseover = function () {}
                folders[i].select = false;
                folders[i].className = "fixed-folder";
            }
    } else {
        this.onmouseover = onmouseoverFunctionFolder;
        this.onmouseout = onmouseoutFunctionFolder;
        this.select = false;
        this.className = "iconTextPair";
        for (let i = 0; i < folders.length; i++)
            if (folders[i] != this){
                folders[i].onmouseover = onmouseoverFunctionFolder;
                folders[i].onmouseout = onmouseoutFunctionFolder;
                folders[i].select = false;
                folders[i].className = "iconTextPair";
            }
    }
}

for(let i = 0; i < folders.length; i ++)
{
    folders[i].select = false;
    folders[i].onmouseover = onmouseoverFunctionFolder;
    folders[i].onmouseout = onmouseoutFunctionFolder;
    folders[i].onclick = onclickFunctionFolder;
}

for(let i = 1; i <= 6; i ++){
    let layerI = cube.getElementsByClassName(`side layer-${i}`);
    for(let j = 0; j < layerI.length; j ++){
        layerI[j].onmouseout = onmouseoutFunctionLayer;
        layerI[j].onmouseover = onmouseoverFunctionLayer;
    }
}