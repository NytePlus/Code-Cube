document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('userInput');
    const label = document.getElementById('inputLabel');
    const output = document.getElementById('output');
    usersnamePasswordDiv = document.getElementById('usersnamePasswordDiv');
    let divState = 0;
    let usersnameState = 0;
    let isUsernameEntered = false; // 用于跟踪用户名是否已输入
    let mode = ''; // 当前模式：''（无）、'register'、'login'
    let username = ''; // 用于存储输入的用户名

    function setInitialState() {
        output.innerHTML = '输入r并按下Enter注册<br>输入l并按下Enter登录';
        label.textContent = '请输入R以注册，L以登录（不区分大小写）';
        input.value = '';
        mode = '';
        isUsernameEntered = false; // 重置用户名输入状态
        input.type = 'text'; // 重置输入框类型
        username = ''; // 重置用户名
    }


    //setInitialState(); // 初始化状态

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
                }
                if(event.key === 'r' || event.key === 'R')
                {
                    event.preventDefault(); // 阻止默认的Enter键行为
                    usersnameInput.removeAttribute('disabled');
                    usersnameInput.setAttribute('placeholder', "username(register)");
                    usersnameInput.focus();
                    usersnameState = divState = 2;
                    cursor.style.visibility = 'hidden';
                    r.style.color = 'white';
                }
                break;
            case 1://login激活状态
                if(event.key === 'Enter')
                {
                    usersnameInput.setAttribute('disabled', 'disabled');
                    passwordInput.removeAttribute('disabled');
                    passwordInput.focus();
                    usersnameInput.className = 'zipInput';
                    passwordInput.className = 'input';
                    divState = 3;
                }
                if(event.key === 'Backspace' && usersnameInput.selectionStart === 0)
                {
                    divState = 0;
                    event.preventDefault(); // 阻止默认的Enter键行为
                    cursor.style.visibility = 'visible';
                    usersnameInput.setAttribute('disabled', 'disabled');
                    usersnameInput.setAttribute('placeholder', "r=register  l=login");
                    l.style.color = 'gray';
                }
                break;
            case 2://register激活状态
                if(event.key === 'Enter')
                {
                    usersnameInput.setAttribute('disabled', 'disabled');
                    passwordInput.removeAttribute('disabled');
                    passwordInput.focus();
                    usersnameInput.className = 'zipInput';
                    passwordInput.className = 'input';
                    divState = 3;
                }
                if(event.key === 'Backspace' && usersnameInput.selectionStart === 0)
                {
                    divState = 0;
                    event.preventDefault(); // 阻止默认的Backspace键行为
                    cursor.style.visibility = 'visible';
                    usersnameInput.setAttribute('placeholder', "r=register  ");
                    usersnameInput.setAttribute('disabled', 'disabled');
                    r.style.color = 'gray';
                }
                break;
            case 3://password激活状态
                if(event.key === 'Enter')
                {
                    passwordInput.focus();
                    if(usersnameState === 1)
                    {
                        password2Input.focus();
                        passwordInput.setAttribute('disabled', 'disabled');
                        password2Input.removeAttribute('disabled');
                        password2Input.className = 'input';
                        passwordInput.className = 'zipInput';
                        divState = 4;
                    }
                    else divState = 5;
                }
                if(event.key === 'Backspace' && passwordInput.selectionStart === 0)
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
                if(event.key === 'Enter')
                {
                    passwordInput.focus();
                    divState = 6;
                }
                if(event.key === 'Backspace' && password2Input.selectionStart === 0)
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

                break;
            case 6://register成功状态

                break;
        }
    });

    // input.addEventListener('keypress', (event) => {
    //     if (event.key === 'Enter') {
    //         const inputValue = input.value.trim(); // 获取并清理输入值
    //         event.preventDefault(); // 阻止默认的Enter键行为
    //
    //         if (inputValue === 'l' && mode !== 'login') {
    //             mode = 'login';
    //             label.textContent = '登录模式：请输入您的用户名吧！';
    //             output.innerHTML = '还未注册？输入 R 按下 Enter 试试！';
    //             isUsernameEntered = false;
    //             input.value = '';
    //             input.type = 'text';
    //             return;
    //         }
    //
    //         // 允许从任何状态切换到注册模式
    //         if (inputValue === 'r' && mode !== 'register') {
    //             mode = 'register';
    //             label.textContent = '注册模式：请取一个自己喜欢的名字吧！';
    //             output.innerHTML = '已有账号？输入 L 按下 Enter 试试！';
    //             isUsernameEntered = false;
    //             input.value = '';
    //             input.type = 'text';
    //             return;
    //         }
    //
    //             if (mode === 'register') {
    //                 if (!isUsernameEntered) {
    //                     username = inputValue;
    //                     output.innerHTML = `注册模式: 您的新名字是： ${inputValue}`;
    //                     label.textContent = '请输入您的密码，记住不要太简单！';
    //                     input.type = 'password'; // 更改为密码输入
    //                     isUsernameEntered = true; // 标记用户名已输入
    //                 }
    //                 else {
    //                     // 这里假设密码已输入
    //                     output.innerHTML = `注册完成，欢迎新用户 ${username}！`;
    //                     //setInitialState(); // 重置为初始状态
    //                 }
    //             }
    //             else if (mode === 'login') {
    //             // 登录模式的相关处理
    //                 if (!isUsernameEntered) {
    //                     username = inputValue; // 存储输入的用户名
    //                     output.innerHTML = `登录模式: 欢迎回来！ ${username}`;
    //                     label.textContent = '请输入您的密码：';
    //                     input.type = 'password'; // 更改为密码输入
    //                     isUsernameEntered = true; // 标记用户名已输入
    //                 }
    //                 else {
    //                     // 这里假设密码已输入，可以进行验证
    //                     output.innerHTML = `尝试登录中... 欢迎回来！${username}`;
    //                     //setInitialState(); // 重置为初始状态
    //                     // 在实际应用中，这里应当发送请求到后端验证用户名和密码
    //                 }
    //             }
    //
    //         input.value = ''; // 准备接受下一次输入
    //     }
    // });
    input.focus();

    // 确保输入框始终获得焦点
    input.addEventListener('blur', () => {
        setTimeout(() => input.focus(), 0); // 当输入框失去焦点时重新获得焦点
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
