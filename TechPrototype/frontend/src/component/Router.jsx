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
                    <Route index element={<LoginPagePlus/>} />
                    <Route path={"/:user"} element={<HomePage/>} />
                    <Route path={"/:user/:repo"} element={<RepoPage/>}/>
                </Routes>
            </InstructionProvider>
        </AuthProvider>
    </BrowserRouter>
}