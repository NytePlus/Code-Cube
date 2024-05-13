import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "../page/HomePage";
import AuthProvider, {useAuth} from "./AuthProvider";
import InstructionProvider from './InstructionProvider';
import LoginPage from "../page/LoginPage"
import React, {useState} from "react";
import RepoPage from "../page/RepoPage";
import LoginPagePlus from "../page/LoginPagePlus";
import BrowsingHistoryPage from "../page/BrowsingHistoryPage";

export default function AppRouter() {

    return <BrowserRouter>
        <AuthProvider>
            <InstructionProvider>
                <Routes>
                    <Route index element={<BrowsingHistoryPage/>} />
                    <Route path={"/:user"} element={<HomePage/>} />
                    <Route path={"/:user/:repo"} element={<RepoPage/>}/>
<<<<<<< HEAD
                    <Route path={"/History"} element={<LoginPagePlus/>}/>
=======
                    <Route path={"/:user/:brows"} element={<BrowsingHistoryPage/>}/>
>>>>>>> 1827f9bbae511653d4b1e02eb9051c2a08d4c383
                </Routes>
            </InstructionProvider>
        </AuthProvider>
    </BrowserRouter>
}