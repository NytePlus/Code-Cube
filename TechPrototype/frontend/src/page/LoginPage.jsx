import {useEffect, useRef, useState} from "react";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import {useAuth} from "../component/AuthProvider";

export default function LoginPage(effect, deps){
    const hint=['输入r注册，输入l登录', 'r=register  l=login', 'l or r?', 'l | r', '如果已有账号，请输入l（log in）', '如果没有账号，请输入r注册(register)', '不区分大小写', ' >_<'];
    const [userState, _setUserState] = useState(0)
    const [divState, _setDivState] = useState(0)
    const [userInState, setUserInState] = useState(true)
    const [passInState, setPassInState] = useState(false)
    const [confInState, setConfInState] = useState(false)
    const [hintId, setHintId] = useState(1)
    const [cursorState, setCursorState] = useState(true)
    const [lState, setLState] = useState(false)
    const [rState, setRState] = useState(false)

    const [stateIcon, setStateIcon] = useState()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const auth = useAuth()

    const userInRef = useRef()
    const passInRef = useRef()
    const confInRef = useRef()


    useEffect(() => {
        switch(divState){
            case 0:
                setCursorState(true)
                setUserInState(true)
                setLState(false)
                setRState(false)
                setStateIcon(<QuestionMarkOutlinedIcon/>)
                break;
            case 1:
                setUserInState(true)
                setCursorState(false)
                setPassInState(false)
                setLState(true)
                userInRef.current && userInRef.current.focus();
                setStateIcon(<QuestionMarkOutlinedIcon/>);
                break;
            case 2:
                setUserInState(true)
                setCursorState(false)
                setPassInState(false)
                setRState(true)
                setStateIcon(<AccountCircleOutlinedIcon/>)
                // userInRef.current && userInRef.current.focus();
                break;
            case 3:
                setUserInState(false)
                setPassInState(true)
                setConfInState(false)
                // passInRef.current && passInRef.current.focus();
                break;
            case 4:
                setPassInState(false)
                setConfInState(true)
                // confInRef.current && confInRef.current.focus();
                break;
            case 5:
                setStateIcon(<LockOpenOutlinedIcon/>)
                break;
            case 6:
                setStateIcon(<LockOpenOutlinedIcon/>)
                break;
        }
    }, [divState])

    const divStateRef = useRef(divState);
    const setdivState = data => {
        divStateRef.current = data;
        _setDivState(data);
    };

    const userStateRef = useRef(userState);
    const setUserState = data => {
        userStateRef.current = data;
        _setUserState(data);
    };

    const onKeydownHandler = (event) => {
        let nowDivState = divStateRef.current, nowUserState = userStateRef.current

        switch(divStateRef.current)
        {
            case 0://未选择状态
                if(event.key === 'l' || event.key === 'L')
                {
                    nowDivState = 1
                    nowUserState = 1
                }
                else if(event.key === 'r' || event.key === 'R')
                {
                    nowDivState = 2
                    nowUserState = 2
                }
                else
                {
                    userInRef.current.setAttribute('placeholder', hint[hintId]);
                    setHintId(hintId === hint.length - 1 ? 0: hintId + 1)
                }
                break;
            case 1://login激活状态
                if(event.key === 'Enter' || event.key === ' ')
                {
                    nowDivState = 3
                    event.preventDefault(); // 阻止默认的Space键行为
                }
                if((event.key === 'Backspace' || event.key === 'ArrowLeft') && userInRef.current.selectionStart === 0)
                {
                    nowDivState = 0
                    event.preventDefault(); // 阻止默认的Enter键行为
                }
                break;
            case 2://register激活状态
                if(event.key === 'Enter' || event.key === ' ')
                {
                    nowDivState = 3
                    event.preventDefault(); // 阻止默认的Space键行为
                }
                if((event.key === 'Backspace' || event.key === 'ArrowLeft') && userInRef.current.selectionStart === 0)
                {
                    nowDivState = 0
                    event.preventDefault(); // 阻止默认的Backspace键行为
                }
                break;
            case 3://password激活状态
                if(event.key === 'Enter' || event.key === ' ')
                {
                    event.preventDefault(); // 阻止默认的Space键行为
                    if(userStateRef.current === 2)
                    {
                        nowDivState = 4
                    }
                    else
                    {
                        nowDivState = 5
                    }
                }
                if((event.key === 'Backspace' || event.key === 'ArrowLeft')&& passInRef.current.selectionStart === 0)
                {
                    nowDivState = userStateRef.current
                    event.preventDefault(); // 阻止默认的Backspace键行为
                }
                break;
            case 4://confirm password激活状态
                if(event.key === 'Enter' || event.key === ' ')
                {
                    event.preventDefault(); // 阻止默认的Space键行为
                    nowDivState = 6
                }
                if((event.key === 'Backspace' || event.key === 'ArrowLeft') && confInRef.current.selectionStart === 0)
                {
                    nowDivState = 3
                    event.preventDefault(); // 阻止默认的Enter键行为
                }
                break;
            case 5://login成功状态
                auth.loginAction(username, password)
                break;
            case 6://register成功状态

                break;
        }
        setdivState(nowDivState)
        setUserState(nowUserState)
        console.log({keydown: event.key, state: divStateRef.current})
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeydownHandler); // 添加全局事件
        passInRef.current.focus();
        return () => {
            window.removeEventListener('keydown', onKeydownHandler); // 销毁
        };
    }, []);

    return (<>
        <div id="snow"/>
        <div id='usersnamePasswordDiv' className="usersnamePasswordDiv">
            <div className="stateDiv">
                <span className="blink" id="cursor" style={{visibility: cursorState ? 'visible' : 'hidden'}}>/</span>
                <div id="r" style={{color: rState ? 'white':'gray'}}>r</div>
                <div id="l" style={{color: lState ? 'white':'gray'}}>l</div>
            </div>
            <input ref={userInRef} className={userInState ? 'input' : 'zipInput'} type="text" id="usersname"
                    placeholder={userInState ? "username(login)" : "输入r注册，输入l登录"} disabled={!userInState}
                onChange={(e) => {
                    setUsername(e.target)}}/>
                <input ref={passInRef} className={passInState?'input':'zipInput'} type="password" id="password"
                       placeholder={passInState ? "password" : ""} disabled={!passInState}
                       onChange={(e) => { setPassword(e.target.value)}}/>
                    <input ref={confInRef} className={confInState?'input':'zipInput'} type="password" id="password2"
                           placeholder={confInState ? "confirm password" : ""} disabled={!confInState}/>
            <div className="stateDiv icon">
                {stateIcon}
            </div>
        </div>
    </>)
}