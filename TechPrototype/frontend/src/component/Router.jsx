import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "../page/HomePage";
import AuthProvider, {useAuth} from "./AuthProvider";
import InstructionProvider from './InstructionProvider';
import LoginPage from "../page/LoginPage"
import React, {useState} from "react";
import RepoPage from "../page/RepoPage";
import LoginPagePlus from "../page/LoginPagePlus";

export default function AppRouter() {

    return <BrowserRouter>
        <AuthProvider>
            <InstructionProvider>
                <Routes>
                    <Route index element={<HomePage/>} />
                    <Route path={"/:user/home"} element={<RepoPage/>} />
                    <Route path={"/:user/:Repo"} element={<LoginPagePlus/>}/>
                </Routes>
            </InstructionProvider>
        </AuthProvider>
    </BrowserRouter>
}