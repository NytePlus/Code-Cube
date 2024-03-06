let cube = document.getElementById("cube");
let folder = cube.getElementsByClassName("folder");

for(let i = 0; i < folder.length; i ++)
{
    folder[i].onmouseenter = function ()
    {
        let layerId = folder[i].parentElement.id;
        let subLayer = document.getElementById(`${layerId}/${folder[i].getAttribute("name")}`);
        subLayer.style.visibility = 'visible';
    };
    folder[i].onmouseout = function ()
    {
        let layerId = folder[i].parentElement.id;
        let subLayer = document.getElementById(`${layerId}/${folder[i].getAttribute("name")}`);
        subLayer.style.visibility = 'hidden';
    };
}