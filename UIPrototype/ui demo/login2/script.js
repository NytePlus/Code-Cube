const icons=
    [/*0:question mark*/"<path d=\"M160 164s1.44-33 33.54-59.46C212.6 88.83 235.49 84.28 256 84c18.73-.23 35.47 2.94 45.48 7.82C318.59 100.2 352 120.6 352 164c0 45.67-29.18 66.37-62.35 89.18S248 298.36 248 324\" fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"40\"/>\n" +
    "<circle cx=\"248\" cy=\"399.99\" r=\"32\" fill=\"white\"/>",
    /*1:login-ing*/"<path d=\"M336 208v-95a80 80 0 00-160 0v95\" fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"45\"/>\n" +
    "<rect x=\"96\" y=\"208\" width=\"320\" height=\"272\" rx=\"48\" ry=\"48\" fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"45\"/>",
    /*2:register-ing*/"<path d=\"M376 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z\" fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\"/>\n" +
    "<path d=\"M288 304c-87 0-175.3 48-191.64 138.6-2 10.92 4.21 21.4 15.65 21.4H464c11.44 0 17.62-10.48 15.65-21.4C463.3 352 375 304 288 304z\" fill=\"none\" stroke=\"white\" stroke-miterlimit=\"10\" stroke-width=\"32\"/>\n" +
    "<path fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\" d=\"M88 176v112M144 232H32\"/>\n",
    /*3:login succeed*/"<path d=\"M336 112a80 80 0 00-160 0v96\" fill=\"none\" stroke=\"green\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"45\"/>\n" +
    "<rect x=\"96\" y=\"208\" width=\"320\" height=\"272\" rx=\"48\" ry=\"48\" fill=\"none\" stroke=\"green\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"45\"/>",
    /*4:register succeed*/"<path fill=\"none\" stroke=\"green\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"45\" d=\"M416 128L192 384l-96-96\"/>\n"];

const hint=['输入r注册，输入l登录', 'r=register  l=login', 'l or r?', 'l | r', '如果已有账号，请输入l（log in）', '如果没有账号，请输入r注册(register)', '不区分大小写', ' >_<'];
document.addEventListener('DOMContentLoaded', () => {
    let usersnamePasswordDiv = document.getElementById('usersnamePasswordDiv');
    let stateIcon = document.getElementById("stateIcon");
    let divState = 0;
    let usersnameState = 0;
    let hintId = 1;

    document.addEventListener('keydown', (event) =>
    {
        const cursor = document.getElementById("cursor");
        const l = document.getElementById('l');
        const r = document.getElementById('r');
        const usersnameInput = document.getElementById("usersname");
        const passwordInput = document.getElementById("password");
        const password2Input = document.getElementById("password2");
        switch(divState)
        {
            case 0://未选择状态
                if(event.key === 'l' || event.key === 'L')
                {
                    event.preventDefault(); // 阻止默认的Enter键行为
                    usersnameInput.removeAttribute('disabled');
                    usersnameInput.setAttribute('placeholder', "username(login)");
                    usersnameInput.focus();
                    usersnameState = divState = 1;
                    cursor.style.visibility = 'hidden';
                    l.style.color = 'white';
                    stateIcon.innerHTML = icons[1];
                }
                else if(event.key === 'r' || event.key === 'R')
                {
                    event.preventDefault(); // 阻止默认的Enter键行为
                    usersnameInput.removeAttribute('disabled');
                    usersnameInput.setAttribute('placeholder', "username(register)");
                    usersnameInput.focus();
                    usersnameState = divState = 2;
                    cursor.style.visibility = 'hidden';
                    r.style.color = 'white';
                    stateIcon.innerHTML = icons[2];
                }
                else
                {
                    usersnameInput.setAttribute('placeholder', hint[hintId]);
                    hintId = hintId === hint.length - 1 ? 0: hintId + 1;
                }
                break;
            case 1://login激活状态
                if(event.key === 'Enter' || event.key === ' ')
                {
                    usersnameInput.setAttribute('disabled', 'disabled');
                    passwordInput.removeAttribute('disabled');
                    passwordInput.focus();
                    usersnameInput.className = 'zipInput';
                    passwordInput.className = 'input';
                    divState = 3;
                    event.preventDefault(); // 阻止默认的Space键行为
                }
                if((event.key === 'Backspace' || event.key === 'ArrowLeft') && usersnameInput.selectionStart === 0)
                {
                    divState = 0;
                    event.preventDefault(); // 阻止默认的Enter键行为
                    cursor.style.visibility = 'visible';
                    usersnameInput.setAttribute('disabled', 'disabled');
                    usersnameInput.setAttribute('placeholder', "r=register  l=login");
                    l.style.color = 'gray';
                    stateIcon.innerHTML = icons[0];
                }
                break;
            case 2://register激活状态
                if(event.key === 'Enter' || event.key === ' ')
                {
                    usersnameInput.setAttribute('disabled', 'disabled');
                    passwordInput.removeAttribute('disabled');
                    passwordInput.focus();
                    usersnameInput.className = 'zipInput';
                    passwordInput.className = 'input';
                    divState = 3;
                    event.preventDefault(); // 阻止默认的Space键行为
                }
                if((event.key === 'Backspace' || event.key === 'ArrowLeft') && usersnameInput.selectionStart === 0)
                {
                    divState = 0;
                    event.preventDefault(); // 阻止默认的Backspace键行为
                    cursor.style.visibility = 'visible';
                    usersnameInput.setAttribute('placeholder', "r=register  ");
                    usersnameInput.setAttribute('disabled', 'disabled');
                    r.style.color = 'gray';
                    stateIcon.innerHTML = icons[0];
                }
                break;
            case 3://password激活状态
                if(event.key === 'Enter' || event.key === ' ')
                {
                    passwordInput.focus();
                    event.preventDefault(); // 阻止默认的Space键行为
                    if(usersnameState === 2)
                    {
                        passwordInput.setAttribute('disabled', 'disabled');
                        password2Input.removeAttribute('disabled');
                        password2Input.className = 'input';
                        passwordInput.className = 'zipInput';
                        password2Input.focus();
                        divState = 4;
                    }
                    else
                    {
                        divState = 5;
                        stateIcon.innerHTML = icons[3];
                    }
                }
                if((event.key === 'Backspace' || event.key === 'ArrowLeft')&& passwordInput.selectionStart === 0)
                {
                    divState = usersnameState;
                    usersnameInput.className = 'input';
                    passwordInput.className = 'zipInput';
                    usersnameInput.removeAttribute('disabled');
                    passwordInput.setAttribute('disabled', 'disabled');
                    usersnameInput.focus();
                    event.preventDefault(); // 阻止默认的Backspace键行为
                }
                break;
            case 4://confirm password激活状态
                if(event.key === 'Enter' || event.key === ' ')
                {
                    event.preventDefault(); // 阻止默认的Space键行为
                    stateIcon.innerHTML = icons[4];
                    divState = 6;
                }
                if((event.key === 'Backspace' || event.key === 'ArrowLeft') && password2Input.selectionStart === 0)
                {
                    password2Input.className = 'zipInput';
                    passwordInput.className = 'input';
                    passwordInput.removeAttribute('disabled');
                    password2Input.setAttribute('disabled', 'disabled');
                    passwordInput.focus();
                    divState = 3;
                    event.preventDefault(); // 阻止默认的Enter键行为
                }
                break;
            case 5://login成功状态
                window.location.href = "../homepage.html";
                break;
            case 6://register成功状态
                window.location.href = "../homepage.html";
                break;
        }
    });
});



function createSnowflake() {
    const snowFlake = document.createElement('div');
    snowFlake.classList.add('snowflake');
    snowFlake.style.left = Math.random() * 100 + 'vw';
    snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's'; // 随机动画时间
    snowFlake.style.opacity = Math.random();
    snowFlake.style.fontSize = Math.random() * 30 + 30 + 'px';
    document.getElementById('snow').appendChild(snowFlake);

    // 雪花到底后消失
    setTimeout(() => {
        snowFlake.remove();
    }, 5000);
}

setInterval(createSnowflake, 100); // 每100毫秒创建一个新的雪花
