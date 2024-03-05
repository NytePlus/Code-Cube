import {_editKeyframes} from "../utils/EditKeyframes.js";

let cube = document.querySelector('#cube')
// 定义一个旋转初始量
let init = {x: -21, y: 38}
let side_elements = document.getElementsByClassName("side");
let cube_element = document.getElementsByClassName("cube");

for (let i = 0; i < side_elements.length; i++)
{
    side_elements[i].onmouseover = function ()
    {
        const edit = _editKeyframes("rotate");
        edit('0%{transform: rotateY(${init.y}deg);} 100%{transform: rotateY(${init.y + 30}deg);}')
        side_elements[0].style.animation = "rotate 0.5s linear";
        init = {x:init.x+30, y:init.y+30};
    };
    side_elements[i].onmouseout = function ()
    {

        side_elements[0].style.animation = "@keyframes rotate{0%{\n" +
            "      transform: rotateY(${init.y}deg);\n" +
            "    }\n" +
            "    100%{\n" +
            "      transform: rotateY(${init.y - 30}deg);\n" +
            "    }} 0.5s linear";
        init = {x:init.x-30, y:init.y-30};
    };
}

// let transform = cube.style.transform
// if (transform)
// {
//     let array = transform.split(' ')
//     let nowXY= {
//         x: array[0].match(/rotateX\((.*)deg\)/)[1],
//         y: array[1].match(/rotateY\((.*)deg\)/)[1]
//     }
//     init = {
//         x: nowXY.x % 360,
//         y: nowXY.y % 360
//     }
// }
