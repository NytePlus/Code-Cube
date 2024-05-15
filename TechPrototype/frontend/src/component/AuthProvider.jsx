import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {login} from "../service/login";
import async from "async";
import {signup} from "../service/signup";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") || null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = async (username, password) => {
        try {
            const res = await login(username, password);
            console.log({res: res})
            if (res === true) {
                setUser(username);
                setToken(password);
                localStorage.setItem("user", username);
                localStorage.setItem("site", password);
                navigate("/" + username);
                return;
            }
            throw new Error(res.message);
        } catch (err) {
            console.error(err);
        }
    };

    const signupAction = async (username, passsword, confirm) => {
        try{
            if(passsword !== confirm){
                alert("Signup failed: Confirm password differ")
            }
            else{
                const res = await signup(username, passsword);
                console.log({res: res})
            }
        }catch(err) {
            console.log(err);
        }
    }

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, signupAction, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};